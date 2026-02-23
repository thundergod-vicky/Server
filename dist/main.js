"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("dotenv/config");
const _core = require("@nestjs/core");
const _appmodule = require("./app.module");
const _swagger = require("@nestjs/swagger");
const _common = require("@nestjs/common");
async function bootstrap() {
    const app = await _core.NestFactory.create(_appmodule.AppModule);
    app.useGlobalPipes(new _common.ValidationPipe());
    // Swagger Configuration
    const config = new _swagger.DocumentBuilder().setTitle('Adhyayan API').setDescription('The Adhyayan API documentation').setVersion('1.0').addTag('Adhyayan').addBearerAuth().build();
    const document = _swagger.SwaggerModule.createDocument(app, config);
    _swagger.SwaggerModule.setup('api', app, document);
    // Enable CORS for frontend
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'https://adhyayan-backend-0eak.onrender.com',
            'https://adhyayan-trial.netlify.app'
        ],
        credentials: true,
        methods: [
            'GET',
            'POST',
            'PUT',
            'DELETE',
            'PATCH',
            'OPTIONS'
        ],
        allowedHeaders: [
            'Content-Type',
            'Authorization'
        ]
    });
    await app.listen(process.env.PORT ?? 3002);
}
void bootstrap();

//# sourceMappingURL=main.js.map