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

## Parte 5: Extremo a Extremo y Optimización

### 1. Flujo de Extremo a Extremo (API + UI)
Para crear un flujo híbrido eficiente, el enfoque ideal es utilizar la API como herramienta de preparación de datos (Data Setup) para las pruebas de UI. Por ejemplo, en lugar de usar Selenium para navegar por un formulario y registrar a un usuario de forma visual (lo cual es lento y propenso a fallos), se puede realizar una petición `POST` con Axios al endpoint de creación de usuarios para insertar el registro directamente en la base de datos. Posteriormente, se levanta Selenium WebDriver para realizar el inicio de sesión desde la Interfaz Gráfica utilizando las credenciales del usuario recién creado. Esto reduce drásticamente el tiempo de ejecución y aísla los errores.

### 2. Ejecución en Paralelo e Inestabilidad (Flakiness)
**Ejecución en paralelo:**
* Para las pruebas de API (Jest): Se configuraría el script en el `package.json` utilizando `jest --maxWorkers=4` para correr hilos simultáneos.
* Para las pruebas de UI (Mocha): Se utilizaría el flag `mocha --parallel` junto con una fábrica de WebDrivers que instancie navegadores independientes por cada hilo.

**Reducción de inestabilidad:**
1. **Esperas Dinámicas:** Se elimina por completo el uso de esperas estáticas (hard sleeps), utilizando en su lugar *Explicit Waits* (como `until.elementLocated` de Selenium) que esperan solo el tiempo estrictamente necesario hasta que el elemento interactuable aparezca en el DOM.
2. **Aislamiento de Datos:** Garantizar que cada prueba cree y destruya sus propios datos de prueba para no depender del estado o la "basura" dejada por pruebas anteriores.
3. **Mecanismos de Reintento:** Configurar `retries` en los frameworks (ej. `this.retries(2)` en Mocha) para reejecutar automáticamente una prueba que falló por un problema transitorio de red.

### 3. Escalabilidad a +100 Endpoints
Para escalar este framework a nivel empresarial, se aplicarían las siguientes estrategias:
1. **Capa de Servicios de API:** En lugar de tener las peticiones HTTP directamente en los archivos de test, se crearía una capa de servicios (ej. `UserService`, `BookingService`) que encapsulen las llamadas con el cliente de Axios.
2. **Data-Driven Testing (DDT):** Extraer todas las cargas útiles (payloads) a archivos JSON separados y parametrizar las pruebas para iterar sobre estos conjuntos de datos sin duplicar código.
3. **Arquitectura Modular:** Separar el proyecto en directorios por dominio de negocio (ej. `/tests/api/billing`, `/tests/api/users`), permitiendo ejecutar *suites* específicas mediante etiquetas (tags) en los pipelines de CI/CD para obtener retroalimentación más rápida durante la revisión de código.