
module.exports = function (req, res, next) {
  // 401 Unauthorized 
  // 403 Forbidden  - Quando você não tem um acesso, e um token inválido
  
  if(!req.user.isAdmin)
  return res.status(403).send('Acess denied')

  next();
}