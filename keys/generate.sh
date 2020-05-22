ssh-keygen -t rsa -b 4096 -m PEM -f secret.key
openssl rsa -in secret.key -pubout -outform PEM -out secret.pub
