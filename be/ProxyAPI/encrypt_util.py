from django.conf import settings
from cryptography.fernet import Fernet
import base64

def encrypt(pas):      
    pas = str(pas)
    cipher_pass = Fernet(settings.ENCRYPT_KEY)
    encrypt_pass = cipher_pass.encrypt(pas.encode('ascii'))
    encrypt_pass = base64.urlsafe_b64encode(encrypt_pass).decode("ascii") 
    return encrypt_pass

def decrypt(pas):
    pas = base64.urlsafe_b64decode(pas)
    cipher_pass = Fernet(settings.ENCRYPT_KEY)
    decrypt_pass = cipher_pass.decrypt(pas).decode("ascii")     
    return decrypt_pass