const WebSocket = require('ws');

const ws = new WebSocket('wss://stream.binance.com/stream');

ws.on('open', () => {
    console.log('WebSocket connection established.');

    // Subscribe after connection is opened
    const subscriptionMessage = {
        method: 'SUBSCRIBE',
        params: ['!miniTicker@arr@3000ms', 'btcusdt@aggTrade', 'btcusdt@depth', 'btcusdt@kline_1s',
        ],
        id: 2
    };

    ws.send(JSON.stringify(subscriptionMessage));
});

ws.on('message', (data) => {
    const message = JSON.parse(data);
    if (message && message.data && message.data.e == "kline") {
        console.log(message.data)
    }
});

ws.on('close', () => {
    console.log('WebSocket connection closed.');
});
