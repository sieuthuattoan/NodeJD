const paymentModel = require('../models/PaymentModel');

const index = (req, res) => {
    res.json({
        status: 'success',
        message: 'Payment index'
    });
}

const payment_request = (req, res) => {
    
    var params = {
        receiver: req.body.receiver !== undefined ? req.body.receiver : '',
        order_type: req.body.order_type !== undefined ? req.body.order_type : 0,
        // services and user charge
        referrer: req.body.referrer !== undefined ? req.body.referrer : null,
        service: req.body.service !== undefined ? req.body.service : null,
        uuid: '',
        service_item_id: '',
        os: 0,
        partner: '',
        pay_type: '',
        // for card charge
        code: '',
        serial: '',
        ip: '0.0.0.0',
        // bank param (Ngaluong, Onepay)
        bank_code: req.body.bank_code !== undefined ? req.body.bank_code : null,
        option_payment: req.body.option_payment !== undefined ? req.body.option_payment : null
    };
    var pay_method = req.body.pay_method !== undefined ? req.body.pay_method : '';
    var nl_str = ['nl', 'nl_ib', 'nl_atm', 'nl_visa'];


}