import { execSync } from 'child_process';
import { exit } from 'process';

function runCommand(command: string, description: string): void {
  console.log(`▶️  ${description}...`);
  try {
    execSync(command, { stdio: 'inherit', shell: '/bin/bash' });
  } catch (error) {
    console.error(`❌ ${description} failed. Fix issues before pushing.`);
    exit(1);
  }
}

console.log('🔍 Checking if your branch is ready to push...');

// Run format check
runCommand('npx nx format:check', 'Format check (Prettier)');

// Run lint
runCommand('npx nx run-many --target=lint --all', 'Linting (ESLint)');

// Run build
runCommand('npx nx run-many --target=build --all --configuration=production', 'Production build');

// Run tests with coverage
runCommand('npx nx run-many --target=test --all --code-coverage=true', 'Tests with coverage');

console.log('🎉 All checks passed! Your branch is ready to push.');
