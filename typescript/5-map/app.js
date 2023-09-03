"use strict";
class MyHashTable {
    constructor(bucketsLength = 32) {
        this.keys = {};
        this.buckets = new Array(bucketsLength);
        this.keys = {};
    }
    hash(key) {
        return (key
            .split("")
            .map((k) => k.charCodeAt(0))
            .reduce((a, b) => a + b, 0) % this.buckets.length);
    }
    set(key, value) {
        const hash = this.hash(key);
        if (this.has(key)) {
            for (var entry of this.buckets[hash]) {
                if (entry.key === key) {
                    entry.value = value;
                }
            }
        }
        else {
            if (!this.buckets[hash]) {
                this.buckets[hash] = [];
            }
            this.buckets[hash].push({ key, value });
        }
        this.keys[key] = hash;
    }
    has(key) {
        return Object.hasOwnProperty.call(this.keys, key);
    }
    get(key) {
        var _a;
        const hash = this.hash(key);
        const bucket = this.buckets[hash];
        return (_a = bucket === null || bucket === void 0 ? void 0 : bucket.find((v) => v.key === key)) === null || _a === void 0 ? void 0 : _a.value;
    }
    delete(key) {
        if (!this.has(key)) {
            return null;
        }
        const hash = this.hash(key);
        delete this.keys[key];
        if (!this.buckets[hash]) {
            return null;
        }
        this.buckets[this.hash(key)] = [
            ...this.buckets[this.hash(key)].filter((pair) => pair.key != key),
        ];
    }
    getKeys() {
        return Object.keys(this.keys);
    }
    getValues() {
        return this.buckets.reduce((values, bucket) => {
            const bucketValues = bucket.map((pair) => pair.value);
            return values.concat(bucketValues);
        }, []);
    }
    clear() {
        for (let i = 0; i < this.buckets.length; i++) {
            this.buckets.push([]);
        }
    }
}
const table = new MyHashTable();
table.set("123", "Antonio");
table.set("1234", "Bntonio");
table.set("1235", "Vntonio");
console.log(table.getValues());
console.log(table.get("123"));
