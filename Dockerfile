# Usa una imagen de node como base
FROM node:alpine

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y el package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia los archivos del proyecto al contenedor de trabajo
COPY . .

# Construye la aplicación
RUN npm run build

# Expone el puerto 4000 para que pueda ser accesible desde fuera del contenedor
EXPOSE 4000

# Define el comando para ejecutar la aplicación
CMD ["npm", "start"]
