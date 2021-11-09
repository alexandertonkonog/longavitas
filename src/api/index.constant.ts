export const APIConstants = {
  API_URL: process.env.NODE_ENV === 'production'
    ? 'https://longavitas.ru/lib/widget/index.php' : '/data.json',
  API_LOGIN: 'admin',
  API_PASSWORD: 'admin'
}