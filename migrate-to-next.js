/**
 * Next.js Migration Helper Script
 * 
 * This script helps with switching between the React and Next.js versions of the application.
 * It backs up the original package.json and replaces it with the Next.js version.
 */

const fs = require('fs');
const path = require('path');

// Define file paths
const originalPackageJson = path.join(__dirname, 'package.json');
const nextPackageJson = path.join(__dirname, 'package.json.next');
const backupPackageJson = path.join(__dirname, 'package.json.react');

// Check if we're migrating to Next.js or back to React
const args = process.argv.slice(2);
const migrateToReact = args.includes('--react');

if (migrateToReact) {
  // Migrate back to React
  if (fs.existsSync(backupPackageJson)) {
    console.log('Migrating back to React...');
    fs.copyFileSync(backupPackageJson, originalPackageJson);
    console.log('Migration to React completed!');
    console.log('Run "npm install" to ensure dependencies are correct.');
    console.log('Then run "npm start" to start the React development server.');
  } else {
    console.error('Error: React backup package.json not found. Cannot migrate back to React.');
  }
} else {
  // Migrate to Next.js
  if (!fs.existsSync(nextPackageJson)) {
    // Create Next.js package.json if it doesn't exist
    console.log('Creating Next.js package.json...');
    const packageData = require(originalPackageJson);
    
    // Backup the original package.json
    fs.copyFileSync(originalPackageJson, backupPackageJson);
    
    // Modify for Next.js
    packageData.dependencies = {
      ...packageData.dependencies,
      'next': '^13.4.19',
    };
    
    // Update scripts for Next.js
    packageData.scripts = {
      ...packageData.scripts,
      'dev': 'next dev',
      'build': 'next build',
      'start': 'next start',
    };
    
    // Write the Next.js package.json
    fs.writeFileSync(nextPackageJson, JSON.stringify(packageData, null, 2));
  }
  
  // Apply the Next.js package.json
  console.log('Migrating to Next.js...');
  fs.copyFileSync(nextPackageJson, originalPackageJson);
  console.log('Migration to Next.js completed!');
  console.log('Run "npm install" to install Next.js dependencies.');
  console.log('Then run "npm run dev" to start the Next.js development server.');
}