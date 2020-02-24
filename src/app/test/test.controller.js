
class TestController {
  async get(req, res) {
    res.json({
      status: 'OK'
    });
  }
}

module.exports = new TestController();