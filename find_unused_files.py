import os
import re
from pathlib import Path

# Directories to check for unused files
CHECK_DIRS = ['components', 'utils', 'lib', 'types', 'context', 'stores', 'hooks']

# Directories to scan for imports
SCAN_DIRS = ['.']

EXCLUDE_DIRS = {'.next', 'node_modules', '.git', '.vercel'}

def get_all_files():
    """Get all TypeScript/TSX files from CHECK_DIRS"""
    all_files = {}
    for check_dir in CHECK_DIRS:
        if not os.path.exists(check_dir):
            continue
        for root, dirs, files in os.walk(check_dir):
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
            for file in files:
                if file.endswith(('.ts', '.tsx')):
                    rel_path = os.path.relpath(os.path.join(root, file), '.')
                    # Normalize path
                    rel_path = rel_path.replace('\\', '/')
                    # Remove file extension for module name
                    module_name = rel_path.replace('.ts', '').replace('.tsx', '')
                    all_files[module_name] = rel_path
    return all_files

def find_imports(directory):
    """Find all import statements in all TS/TSX files"""
    imported = set()
    for root, dirs, files in os.walk(directory):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for file in files:
            if file.endswith(('.ts', '.tsx')):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                        # Find import statements
                        import_patterns = [
                            r'from\s+[\'"]@/([^\'"]+)[\'"]',  # @/path imports
                            r'from\s+[\'"]\.\.?/([^\'"]+)[\'"]',  # relative imports
                            r'from\s+[\'"]([^\'"]+)[\'"]',  # any import
                        ]
                        for pattern in import_patterns:
                            matches = re.findall(pattern, content)
                            for match in matches:
                                # Normalize the import path
                                normalized = match.replace('\\', '/').rstrip('/')
                                imported.add(normalized)
                except Exception:
                    pass
    return imported

def main():
    all_files = get_all_files()
    imported = find_imports('.')
    
    # Check which files are not imported (excluding entry points and layout files)
    unused = []
    entry_points = {
        'app/layout',
        'app/page',
        'app/not-found',
        'app/(components)/header/index',
        'app/(components)/nav/index',
        'app/(components)/wrapper/index',
        'app/(components)/chains/index',
        'app/(components)/wallet/index',
        'app/(components)/wrapper/modal',
        'app/(components)/nav/nav-item',
    }
    
    for module_name, file_path in all_files.items():
        # Skip entry points and index files
        if module_name in entry_points or module_name.endswith('(components)'):
            continue
            
        # Check if this module is imported anywhere
        is_used = False
        
        # Check direct imports
        if module_name in imported:
            is_used = True
        
        # Check partial matches (for components/xxx/index imports as components/xxx)
        if not is_used:
            base_name = module_name
            if base_name in imported:
                is_used = True
            # Check if it's imported with different paths
            for imp in imported:
                if imp == module_name or imp.endswith(module_name):
                    is_used = True
                    break
        
        # Also check if it's a default export that might be imported differently
        # Skip index files as they're often entry points
        if not is_used and not file_path.endswith('/index.ts') and not file_path.endswith('/index.tsx'):
            unused.append((module_name, file_path))
    
    print(f"Total files checked: {len(all_files)}")
    print(f"Unused files ({len(unused)}):\n")
    for module_name, file_path in sorted(unused):
        print(f"  {file_path}")

if __name__ == '__main__':
    main()
