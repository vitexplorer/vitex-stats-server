export const environment = {
  production: true,
  backendURL: function () {
    return 'https://' + document.location.host + '/api';
  },
  coinGeckoURL: 'https://api.coingecko.com/api/v3',
};
