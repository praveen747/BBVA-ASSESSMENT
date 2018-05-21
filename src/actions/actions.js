// import DataService from './services/ServiceApi';

// export function loadData() {
//     return function(dispatch) {
//         return DataService.getData().then(
//             function(response) {
//                 console.log(response);
//                 dispatch(loadDataSuccess(response));
//             },
//             function(e) {
//                 console.log("Error" + e);
//             }
//         )
//     }
// }

// function loadDataSuccess(response) {
//     const mylist = response.mylist;
//     const recommendations = response.recommendations;
//     let payload = {};
//     payload.mylist = mylist;
//     payload.recommendations = recommendations;
//     return {
//         type: SET_DATA_FROM_SERVICE,
//         payload
//     };
// };

export function addEvent(event){
    return function(dispatch) {
        dispatch({
            type: "ADD_EVENT",
            event
        })
    }
}

export function deleteEvent(id){
    return function(dispatch) {
        dispatch({
            type: "DELETE_EVENT",
            id
        })
    }
}

