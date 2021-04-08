
var axios = require("axios");

const signin_url="http://localhost:3000/signin"
const signout_url="http://localhost:3000/signout"
const deleteusr_url = "http://localhost:3000/admin/users/delete"
const deleteplat_url = "http://localhost:3000/admin/platform/delete"

function deletePlatform(id)
{
    return axios({
        method: 'post',
        url: signin_url,
        data: {
          username: 'admin',
          password: 'admin'
        }
    }).then((response) => {
        return axios({
            method: 'post',
            url: deleteplat_url,
            data: {
                _id: id
            },
            headers: { Cookie: response.headers["set-cookie"][0] }
        });
    })
}

function deleteUser(name)
{
    return axios({
        method: 'post',
        url: signin_url,
        data: {
          username: 'admin',
          password: 'admin'
        }
    }).then((response) => {
        return axios({
            method: 'post',
            url: deleteusr_url,
            data: {
              username: name
            },
            headers: { Cookie: response.headers["set-cookie"][0] }
        });
    })
}

module.exports.deletePlatform = deletePlatform;
module.exports.deleteUser = deleteUser;