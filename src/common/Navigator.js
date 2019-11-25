
import { NavigationActions, StackActions } from 'react-navigation';

let _container;

function setContainer(container) {
    _container = container;
}

function reset(routeName, params = {}) {
    _container.dispatch(
        NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    type: 'Navigation/NAVIGATE',
                    routeName,
                    params,
                }),
            ],
        }),
    );
}

function goBack(routeName) {
    _container.dispatch(
        NavigationActions.back({
            key: routeName,
        }),
    );
}

function stackReset(routeName, params = {}) {
    _container.dispatch(
        StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({
                    routeName,
                    params
                })
            ]
        })
    );
}


function navigate(routeName, params = {}) {
    _container.dispatch(
        NavigationActions.navigate({
            type: 'Navigation/NAVIGATE',
            routeName,
            params,
        }),
    );
}

export default {
    setContainer,
    navigate,
    reset,
    stackReset,
    goBack
};