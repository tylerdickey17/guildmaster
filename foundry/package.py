"""Build and validate the dependency-free Guildmaster module archive."""
from pathlib import Path
import hashlib
import json
import subprocess
import zipfile

root=Path(__file__).resolve().parent
module=root/'guildmaster'
manifest=json.loads((module/'module.json').read_text())
assert manifest['id']=='guildmaster'
assert 'verified' not in manifest['compatibility'], 'Do not claim live verification without evidence.'
for relative in manifest['esmodules']+manifest['styles']:
    assert (module/relative).is_file(), relative
for script in list((module/'scripts').glob('*.mjs'))+list((module/'vendor').glob('*.js')):
    subprocess.run(['node','--check',str(script)],check=True)

releases=root/'releases'
releases.mkdir(exist_ok=True)
archive=releases/f"guildmaster-{manifest['version']}.zip"
with zipfile.ZipFile(archive,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=9) as output:
    for file in sorted(module.rglob('*')):
        if not file.is_file():continue
        info=zipfile.ZipInfo(file.relative_to(module).as_posix(),date_time=(2026,10,13,0,0,0))
        info.compress_type=zipfile.ZIP_DEFLATED
        info.external_attr=0o100644<<16
        output.writestr(info,file.read_bytes())
with zipfile.ZipFile(archive) as package:
    assert package.testzip() is None
    assert 'module.json' in package.namelist()
    for file in sorted(module.rglob('*')):
        if file.is_file():assert package.read(file.relative_to(module).as_posix())==file.read_bytes()

summary={'moduleVersion':manifest['version'],'archive':archive.name,'bytes':archive.stat().st_size,'sha256':hashlib.sha256(archive.read_bytes()).hexdigest(),'entries':len(zipfile.ZipFile(archive).namelist()),'foundryRuntimeVerified':False}
(root/'package-verification.json').write_text(json.dumps(summary,indent=2)+'\n')
print(json.dumps(summary))
