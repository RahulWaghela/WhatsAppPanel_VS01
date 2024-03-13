// breadcrumbMiddleware.js
const breadcrumbsData = {
    '/': [{ label: 'Home', url: '/contacts' }],
    '/category': [{ label: 'Home', url: '/' }, { label: 'Category', url: '/category' }],
    '/category/subcategory': [{ label: 'Home', url: '/' }, { label: 'Category', url: '/category' }, { label: 'Subcategory', url: '/category/subcategory' }],
    // Add more routes and corresponding breadcrumbs as needed
};

function breadcrumbMiddleware(req, res, next) {
    const path = req.path;
    res.locals.breadcrumbs = breadcrumbsData[path] || [];
    next();
}

module.exports = breadcrumbMiddleware;
