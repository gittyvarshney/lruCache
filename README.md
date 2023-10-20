# LRU Cache Implementation in HTML & JS
Implementation of Cache in javascript, we are asynchronously updating the LRU cache and storign the data to browser's localStorage using the LRUCache Class

## LRUCache Class
- constructor
  - First It will try to retrieve the cache data, LRU order & max size from the local storage, if somehow the data is not retrieved sets the default cache size to 1
- set(key,value) 
    -   If key is already present in the cache it will simply update the data to that particular key field & update the LRU accordingly
    -   If key is not present and cache is not full, it will simply add the key and data to the cache & update the LRU accordingly
    -   If key is not present and cache is full, it will first remove the least recently used key field from the cache & update the LRU accordingly
- get(key)
    - If the key is present in the cache it will return it simply otherwise return null
- useKey(key)
  - This method will update the LRU priority array asynchronously whenever a query is made on the cache and save the data into the local storage
- updateLocalStorage()
  - This method runs asynchronously to set the cache data & LRU priority order data into the local storage
- setSize(size)
  - This method will take care of the change of sizes in the LRU cache, whenever size change occurs it will accordingly delete the cache and update the size of the cache

## Functionality 
-   You Can dynamically change the cache size
-   You Can Set any particular key value pair in the cache
-   You Can Query the data from the cache
-   You Can Also Simulate using the particular key field (inorder to update it's LRU priority)
-   You Can Clear the data

## Screenshots
![Browser Screenshot](https://github.com/gittyvarshney/lruCache/blob/main/lru-cache.png?raw=true)


## Deployments


## Steps to run Locally
- clone the repo:
- Start VS Code
- Install Live Server extenstion
- right Click on index.html and click on open with Live Server