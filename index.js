const axios = require("axios")

exports.getUserByUsername = endpoint => {
  const url = endpoint.url
  const port = endpoint.port
  const username = endpoint.username

  return axios.request({
    method: "GET",
    baseURL: `${url}:${port}`,
    url: `/users/${username}`,
    headers: { Accept: "application/json" },
  })
}

exports.getProductById = endpoint => {
  const url = endpoint.url
  const port = endpoint.port
  const productId = endpoint.productId
  
  return axios.request({
    baseURL: `${url}:${port}`,
    url: `/products/${productId}`,
    headers: { Accept: "application/json" }
  })
}