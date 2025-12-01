import os
import re

used_hooks = set()
for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.next' in root or 'hooks' in root:
        continue
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            try:
                with open(os.path.join(root, file), 'r', encoding='utf-8') as f:
                    content = f.read()
                    matches = re.findall(r'from [\'"](?:.*?/)?hooks/(\w+)[\'"]', content)
                    for match in matches:
                        used_hooks.add(match)
            except:
                pass

# Get all hooks from hooks directory
all_hooks = set()
for file in os.listdir('hooks'):
    if file.endswith(('.ts', '.tsx')):
        hook_name = file.replace('.ts', '').replace('.tsx', '')
        all_hooks.add(hook_name)

unused_hooks = all_hooks - used_hooks

print("Used hooks:")
for hook in sorted(used_hooks):
    print(f"  {hook}")

print(f"\nUnused hooks ({len(unused_hooks)}):")
for hook in sorted(unused_hooks):
    print(f"  {hook}")
