const {createServiceCategory, getUserList} = require('../../services/admin/admin')


exports.createServiceCategory = async (req, res, next) => {
    try {
      const response = await createServiceCategory(req.body);
      res.status(response.statusCode).send({message:response.message});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.listUsers = async (req, res, next) => {
    try {
      const response = await getUserList(req.body);
      res.status(response.statusCode).send({message:response.message, users:response.users});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };