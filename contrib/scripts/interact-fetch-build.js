// An yarn exec protocol script to fetch and build the next interact package.
// We use it in the `deploy` workflow.
// See dev.md for more info

// https://yarnpkg.com/protocol/exec
// noinspection JSUnresolvedReference - no require possible
// 10003

// changing the file, will change the hash and will refetch when running yarn install
const VERSION_REF = 'heads/next';
const {tempDir, buildDir} = execEnv; // injected by Yarn
const TAR_URL = `https://github.com/combostrap/interact/archive/refs/${VERSION_REF}.tar.gz`;
const archivePath = path.join(tempDir, 'source.tar.gz');
const extractDir = path.join(tempDir, 'source');
const packedArchive = path.join(tempDir, 'packed.tgz');

/**
 * Handle 302
 */
function download(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Follow the redirect
        return download(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Download failed: HTTP ${res.statusCode}`));
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', reject);
    }).on('error', reject);
  });
}

(async () => {

  /**
   * Download the tarball with 302 redirection handling
   */
  //await download(TAR_URL, archivePath);
  // Download with headers printing to the console so that we get the commit hash
  // You can see it in the file name: filename=combostrap-interact-<SHORT_SHA>.tar.gz
  child_process.execFileSync('curl',
    ['--silent', '--location', '--dump-header', '-', "https://api.github.com/repos/combostrap/interact/tarball/next", "-o", archivePath], {
      stdio: 'inherit',
    })

  /**
   * Extract
   */
  fs.mkdirSync(extractDir, {recursive: true});
  child_process.execFileSync('tar', ['-xzf', archivePath, '-C', extractDir, '--strip-components=1']);

  /**
   * Install for TypeScript compilation (tsc)
   * We install all and not only devDependencies because yarn does not allow it
   */
  child_process.execFileSync('yarn', ['install'], {
    cwd: extractDir,
    stdio: 'inherit',
  });

  /**
   * Build
   */
  child_process.execFileSync('yarn', ['build'], {
    cwd: extractDir,
    stdio: 'inherit',
  });

  /**
   * Pack to select only the production files
   */
  child_process.execFileSync('yarn', ['pack', '--out', packedArchive], {
    cwd: extractDir,
    stdio: 'inherit',
  });

  /**
   * Extract pack result into buildDir
   * Because Yarn expects buildDir to contain the final package files (not a tarball)
   */
  child_process.execFileSync('tar', ['-xzf', packedArchive, '-C', buildDir, '--strip-components=1']);

})();