"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("dotenv/config");
const _core = require("@nestjs/core");
const _appmodule = require("./app.module");
async function bootstrap() {
    const app = await _core.NestFactory.create(_appmodule.AppModule);
    // Enable CORS for frontend
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'https://adhyayan-backend-0eak.onrender.com'
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
bootstrap();

//# sourceMappingURL=main.js.map