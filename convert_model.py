import base64

def convert_to_base64(file_path):
    with open(file_path, 'rb') as f:
        content = f.read()
        return base64.b64encode(content).decode('utf-8')

if __name__ == "__main__":
    base64_str = convert_to_base64('public/models/armchair.gltf')
    print(base64_str)
