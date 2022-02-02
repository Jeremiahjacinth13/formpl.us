export const API_ENDPOINT = 'https://front-end-task-dot-result-analytics-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates';

export interface TemplateInterface{
    name: string,
    category: string[],
    description: string,
    created: string,
    link: string
}