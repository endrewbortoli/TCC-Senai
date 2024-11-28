import os
from firebase_functions import https_fn
from firebase_admin import initialize_app, storage
from google.cloud import storage as gcs
from werkzeug.utils import secure_filename

# Inicializa o Firebase
initialize_app()

# Função para upload de arquivo
@https_fn.on_request()
def upload_file(request):
    if request.method == 'POST':
        # Recebe o arquivo da requisição
        file = request.files.get('file')

        if file:
            # Faz o upload do arquivo para o Firebase Storage
            filename = secure_filename(file.filename)
            file_path = f'/tmp/{filename}'
            file.save(file_path)

            # Referência ao bucket do Firebase Storage
            bucket = storage.bucket()

            # Cria uma referência para o arquivo no Firebase Storage
            blob = bucket.blob(f'feedback/{filename}')

            # Faz o upload do arquivo
            blob.upload_from_filename(file_path)

            # Torna o arquivo público (opcional)
            blob.make_public()

            # Retorna a URL pública do arquivo
            return https_fn.Response({
                'fileUrl': blob.public_url
            })
        
        return https_fn.Response({"error": "Nenhum arquivo enviado"}, status_code=400)

    return https_fn.Response("Método HTTP não permitido", status_code=405)
