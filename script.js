/** Custom Implementation of LRU Cache in Javascript for Client side data Storage */

class LRUCache{

    /** Default max Size of LRU Cache */
    max_size = 1;

    /** Cache Object to save the keys for value */
    cache = {}

    /** Array to pop the least used key from the array */
    lruOrder = [];

    constructor(){

        /** get cache from local storage if present */
        const savedCache = localStorage.getItem('lruCache');
        if(savedCache){
            this.cache = JSON.parse(savedCache);
        }

        /** get lru order from local storage if present */
        const savedLRU = localStorage.getItem('lru');
        if(savedLRU){
            this.lruOrder = JSON.parse(savedLRU);
        }

        /** get max size from local storage if present */
        const savedSize = localStorage.getItem('maxSize');
        if(savedSize && !isNaN(Number(savedSize))){
            this.max_size = JSON.parse(Number(JSON.parse(savedSize)));
        }

    }

    /** Need to update the local storage asynchronously */
    updateLocalStorage(){
        setTimeout(() => {
            localStorage.setItem('lruCache', JSON.stringify(this.cache));
            localStorage.setItem('lru', JSON.stringify(this.lruOrder));
        })
    }

    setSize(size){

        if(this.lruOrder && this.lruOrder.length > size){

            /** removing least recently used key fields to match the cache size */
            while(this.lruOrder.length !== size){
                let removedKey = this.lruOrder[0]; //removed least recently used
                this.lruOrder = this.lruOrder.slice(1); //removed least recently used in lru order
                delete this.cache[removedKey]; //removed the least recently used key from cache
            }

            this.updateLocalStorage(); //async
        }

        this.max_size = size;
        setTimeout(() => {
            localStorage.setItem('maxSize', JSON.stringify(this.max_size));
        })
    }

    /** It is an asynchronous method which will update the lruOrder and update the local storage accordingly */
    useKey(key){

        setTimeout(() => { 
            if(this.cache[key]){
                const filter_out_key = this.lruOrder.filter((stored_key) => stored_key !== key);
                this.lruOrder = [...filter_out_key, key];
            }
        })
        this.updateLocalStorage();
    }

    set(key, value){

        /** if somehow key is already present in cache we just need to update it's value */
        if(this.cache[key]){

            this.cache[key] = value;
            
        }else{

            /** If cache is not full */
            if(Object.keys(this.cache).length < this.max_size){

                this.cache[key] = value; // setting the cache

            }else{ /** If cache is full we need to remove the least recently used */

                let removedKey = this.lruOrder[0]; //removed least recently used

                this.lruOrder = this.lruOrder.slice(1); //removed least recently used in lru order

                this.lruOrder.push(key);   //added new key as most recently used in lru order

                delete this.cache[removedKey]; //removed the least recently used key from cache

                this.cache[key] = value; // added new key in the cache

            }
        }

        this.useKey(key); //async

    }

    /** Method to clear the whole cache */
    clear(){
        this.cache = {};
        this.lruOrder = [];

        this.updateLocalStorage();
    }

    /** Method to query a particular key in cache */
    get(key){
        if(this.cache[key]){

            /** asynchronus function to update the LRU order */
            this.useKey(key);

            return this.cache[key];

        }else{
            return null;
        }
    }
}

/** HTML part to run the logic on client side driven by events on button click */

/** Input Elements */

const size_input = document.querySelector('#provide-size');

const key_input = document.querySelector('#provide-id');

const value_input = document.querySelector('#provide-value');

const get_input = document.querySelector('#get-value');

const use_input = document.querySelector('#use-value');

/** Event buttons */

const change_size_btn = document.querySelector('#done-button');

const clear_data_btn = document.querySelector('#clear-button');

const set_data_btn = document.querySelector('#store-data-button');

const get_data_btn = document.querySelector('#get-value-button');

const use_data_btn = document.querySelector('#use-value-button');

/** Text Tags */

const p_tag = document.querySelector('#result-get');

const data_used_tag = document.querySelector('#data-used');

const data_set_tag = document.querySelector('#result-set');

/** event handlers */

/** Initializing the LRU Cache */
const cache = new LRUCache();

/** Event fired upon clicking the Change Size */
change_size_btn.addEventListener('click', (e) => {

    const sizeInput = size_input.value;
    if(sizeInput && !isNaN(Number(sizeInput)) && Number(sizeInput) > 0){
        cache.setSize(Number(sizeInput));
    }
});

/** Event fired upon clicking the Clear data button */
clear_data_btn.addEventListener('click', (e) => {
    cache.clear();
});


/** Event fired upon clicking the set data */
set_data_btn.addEventListener('click', (e) => {
    const keyInput = key_input.value;
    const valueInput = value_input.value;

    if(keyInput && typeof keyInput === 'string'){
        cache.set(keyInput,valueInput);
        data_set_tag.textContent = `Data is being stored in the Cache`;
    }

    setTimeout(() => {
        data_set_tag.textContent = ''
    },2000);

});

/** Event fired upon clicking the get data */
get_data_btn.addEventListener('click', (e) => {
    const getInput = get_input.value;

    if(getInput && typeof getInput === 'string'){
        const val = cache.get(getInput);
        if(val){
            p_tag.textContent = val;
            return;
        }

    }

    p_tag.textContent = 'Result Not found';

})

/** Event fired upon clicking the use data */
use_data_btn.addEventListener('click', (e) => {
    const useInput = use_input.value;

    if(useInput && typeof useInput === 'string'){
        cache.useKey(useInput);
        data_used_tag.textContent = `Using key ${useInput} if present in cache`
    }

    setTimeout(() => {
        data_used_tag.textContent = ''   
    },3000);

})

