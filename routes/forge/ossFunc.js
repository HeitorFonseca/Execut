

'use strict';

// web framework
var express = require('express');
var router = express.Router();

// Forge NPM
var forgeSDK = require('forge-apis');

// handle json requests
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// actually perform the token operation
var oauth = require('./oauth');

module.exports = {

    // Create a new bucket 
    PostBucket: function (bucketKey, policyKey) {
        return new Promise(resolveObject => {

            oauth.getTokenInternal().then(function (credentials) {
                var bucketsApi = new forgeSDK.BucketsApi();
                var postBuckets = new forgeSDK.PostBucketsPayload();
                postBuckets.bucketKey = bucketKey;
                postBuckets.policyKey = policyKey;

                console.log("creating bucket", bucketKey, policyKey);
                bucketsApi.createBucket(postBuckets, {}, oauth.OAuthClient(), credentials).then(function (buckets) {
                    resolveObject({ success: true, message: 'Bucket registrado!' });
                }).catch(function (error) {
                    if (error.statusCode && error.statusCode == 409)
                        resolveObject({ success: false, message: 'Bucket já existe!' });
                    else {
                        console.log('Error at OSS Create Bucket:');
                        console.log(error);
                        resolveObject({ success: false, message: 'Erro ao criar o bucket!' });
                    }
                });
            });
        });
    },

    // Create a new bucket 
    DeleteBucket: function (bucketKey) {
        return new Promise(resolveObject => {

            oauth.getTokenInternal().then(function (credentials) {
                var bucketsApi = new forgeSDK.BucketsApi();

                console.log("deleting bucket", bucketKey);
                bucketsApi.deleteBucket(bucketKey, oauth.OAuthClient(), credentials).then(function (buckets) {
                    resolveObject({ success: true, message: 'Bucket deletado!' });
                }).catch(function (error) {
                    resolveObject({ success: false, message: 'Erro ao deletar o bucket!' });
                });
            });
        });
    },

    // Receive a file from the client and upload to the bucket
    PostFile: function (reqBucketKey, file) {
        return new Promise(resolveObject => {
            oauth.getTokenInternal().then(function (credentials) {
                var bucketKey = reqBucketKey;
                var fs = require('fs');
                fs.readFile(file.path, function (err, filecontent) {
                    var objects = new forgeSDK.ObjectsApi();
                    //console.log("upload objects", bucketKey, file);
                    objects.uploadObject(bucketKey, file.originalname, filecontent.length, filecontent, {}, oauth.OAuthClient(), credentials)
                        .then(function (object) {
                            //console.log(object);
                            resolveObject({ success: true, message: 'Arquivo carregado', object: object });
                        }).catch(function (error) {
                            console.log('Erro ao carregar o arquivo');
                            console.log(error);
                            resolveObject({ success: false, message: 'Erro ao carregar o arquivo' });
                        });
                })
            });
        });
    },

    DeleteFile: function (reqBucketKey, file) {
        return new Promise(resolveObject => {

            if (typeof(file) === "string") {
                console.log("entrou");
                file = JSON.parse(file);
            }
            console.log(file, typeof(file));

            oauth.getTokenInternal().then(function (credentials) {
                var bucketKey = reqBucketKey;
                var fs = require('fs');
                fs.readFile(file.path, function (err, filecontent) {
                    var objects = new forgeSDK.ObjectsApi();
                    console.log("delete object", bucketKey, file.originalname, file.path);
                    objects.deleteObject(bucketKey, file.originalname, oauth.OAuthClient(), credentials)
                        .then(function (object) {
                            //console.log(object);
                            resolveObject({ success: true, message: 'File deletado', object: object });
                        }).catch(function (error) {
                            console.log('Erro ao deletar objeto:');
                            console.log(error);
                            resolveObject({ success: false, message: 'Erro ao deletar o objeto' });
                        });
                });

                fs.unlinkSync(file.path);

            });
        });
    },

    // Create a new bucket 
    TranslateFile: function (objectName) {
        return new Promise(resolveObject => {

            oauth.getTokenInternal().then(function (credentials) {
                // prepare the translation job payload
                var postJob = new forgeSDK.JobPayload();
                postJob.input = new forgeSDK.JobPayloadInput();
                postJob.input.urn = objectName;
                postJob.output = new forgeSDK.JobPayloadOutput(
                    [new forgeSDK.JobSvfOutputPayload()]
                );
                postJob.output.formats[0].type = 'svf';
                postJob.output.formats[0].views = ['2d', '3d'];

                // create the derivative API 
                var derivativesApi = new forgeSDK.DerivativesApi();
                // post the job
                derivativesApi.translate(postJob, {}, oauth.OAuthClient(), credentials)
                    .then(function (data) {
                        resolveObject({ success: true, message: 'Objeto traduzido!' });
                    }).catch(function (e) {
                        console.log('Error at Model Derivative job:');
                        // console.log(e);
                        resolveObject({ success: false, message: 'Erro ao traduzir o objeto!' })
                    });
            });

        });

    }
}






