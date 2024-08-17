import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function getStorageFile(path = '') {

    if(path.includes('http')){
        return path
    }else{
        return process.env.NEXT_PUBLIC_STORAGE_PATH + path
    }

}