/**
 * Generate version information for deployment tracking
 * Creates a JSON file with version, git hash, and build timestamp
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get git commit hash (short version)
function getGitHash() {
  try {
    return execSync('git rev-parse --short HEAD')
      .toString()
      .trim();
  } catch (error) {
    console.warn('Warning: Could not get git hash:', error.message);
    return 'unknown';
  }
}

// Get git branch name
function getGitBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD')
      .toString()
      .trim();
  } catch (error) {
    return 'unknown';
  }
}

// Read package.json version
function getPackageVersion() {
  try {
    const packageJson = require('../package.json');
    return packageJson.version;
  } catch (error) {
    return '0.0.0';
  }
}

// Generate version info
const versionInfo = {
  version: getPackageVersion(),
  gitHash: getGitHash(),
  gitBranch: getGitBranch(),
  buildTime: new Date().toISOString(),
  buildTimestamp: Date.now()
};

// Write to public directory
const outputPath = path.join(__dirname, '../public/version.json');
fs.writeFileSync(outputPath, JSON.stringify(versionInfo, null, 2));

console.log('✓ Version info generated:');
console.log(`  Version: ${versionInfo.version}`);
console.log(`  Git Hash: ${versionInfo.gitHash}`);
console.log(`  Branch: ${versionInfo.gitBranch}`);
console.log(`  Build Time: ${versionInfo.buildTime}`);

