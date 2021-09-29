const types = {
    base: require('./components/Base.jsx').default,
    form: require('./components/Form.jsx').default,
}

function Layout({ type = "base", ...props }) {
    const Component = types[type];
    return <Component {...props} />
}

export default Layout;
