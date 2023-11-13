const models = require("../../db/models")

function init(app) {
    app.get('/categories/:id', listCategorySites)
    app.get('/categories',listCategories)
    app.get('/sites',listSites)
    app.get('/sites/:id', getSite)
  
    app.post('/categories/:id', addNewSite)
    app.post('/categories', addNewCategory)
  
    app.delete('/sites/:id', delSite)
    app.delete('/categories/:id', delCategory)
  
    app.put('/sites/:id', updateSite)
}

module.exports = {
    init
}