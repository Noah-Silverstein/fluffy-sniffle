import { defineConfig } from 'vite';
import { sass } from 'sass'

export default defineConfig(({ command, mode }) => {
    return {
        resolve: {
            alias: {
                'babylonjs': mode === 'development' ? 'babylonjs/babylon.max' : 'babylonjs'
            }
        },
        css: {
            proprocessorOptions: {
                sass: {
                    implementation: sass
                }
            }
        }
    };
});
