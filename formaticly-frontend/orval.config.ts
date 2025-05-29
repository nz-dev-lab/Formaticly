
export default {
    feedbackApi: {
        input: './openapi.json',
        output: {
            mode: 'single',
            target: './src/app/api/feedback.api.ts',
            schemas: './src/app/api/model',
        },
    },
};
