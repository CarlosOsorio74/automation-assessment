Descripción
Este repositorio contiene un framework de pruebas automatizadas diseñado para validar tanto servicios backend (API REST) como interfaces de usuario (UI Web). El proyecto implementa el patrón de diseño Page Object Model (POM) para las pruebas visuales y está configurado para ejecutarse en canalizaciones de Integración Continua (CI/CD).

Tecnologías Utilizadas
Backend / API: Jest, Axios

Frontend / UI: Mocha, Chai, Selenium WebDriver

CI/CD: Azure Pipelines

Lenguaje: JavaScript (Node.js)

Requisitos Previos
Node.js (versión 18.x o recomendada)

NPM (Node Package Manager)

Navegador local (Google Chrome o Microsoft Edge) para ejecución gráfica

Instalación y Configuración
Clona el repositorio en tu máquina local.

Abre una terminal en la raíz del proyecto y ejecuta el siguiente comando para instalar las librerías:
npm install

Asegúrate de configurar tus variables de entorno locales en el archivo .env.

Comandos de Ejecución
Para ejecutar las pruebas de API:
npm run test:api

Para ejecutar las pruebas de Interfaz Gráfica (UI):
npm run test:ui

Guía de Contribución y Flujo de Pull Requests (PR)
Para mantener la estabilidad del código en la rama main, todo nuevo desarrollo debe seguir el siguiente flujo estricto:

Creación de Ramas: Todo trabajo debe realizarse en una rama derivada de main. Utiliza la nomenclatura estándar: feature/nombre-de-la-prueba o fix/correccion-de-error.

Commits Estructurados: Utiliza mensajes claros que indiquen el alcance, por ejemplo: feat(api): agregar validacion de status 200 en endpoint de reservas.

Apertura del PR: Al crear el Pull Request hacia main, el pipeline configurado en azure-pipelines.yml se disparará automáticamente.

Criterios de Merge: Para que un PR sea aprobado e integrado, es de carácter obligatorio que:

El pipeline de Azure DevOps finalice en estado exitoso (Check verde).

No existan conflictos de integración con la rama principal.

Cuente con la aprobación (Approve) de al menos un Automation Engineer del equipo.