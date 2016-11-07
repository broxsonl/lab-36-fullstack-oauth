// 'use strict';
//
// let url = 'http://localhost:3000/api';
//
// describe('testing pic service', function() {
//
//   beforeEach( () => {
//     angular.mock.module('leeGram');
//     angular.mock.inject((authService, picService, Upload, $httpBackend, $upload) => {
//       this.authService = authService;
//       this.upload = $upload;
//       authService.setToken('12345678901234');
//       this.picService = picService;
//       this.$httpBackend;
//     });
//   });
//
//   describe('testing picService.uploadGalleryPic', () => {
//
//     it('should return a pic', () => {
//
//       let galleryID = 'thegallery'
//
//       let picData = {
//         name: 'stuff',
//         desc: 'stuffdesc',
//         file: ,
//       };
//
//       let headers = {
//         Authorization: 'Bearer 12345678901234',
//         Accept: 'application/json',
//       }
//
//       let mockFile = {
//       method:'POST',
//       url: `${url}/thegallery/galleryID/pic`,
//       data: {
//         name: picData.name,
//         desc: picData.desc,
//         file:[{
//           "name": "File 1",
//           "body": "abcd121212"
//         }],
//         }
//       }
//
//       this.$httpBackend.expectPOST(`${url}/thegallery/galleryID/pic`, headers, )
//       .respond(200)
//
//
//
//       this.$httpBackend.flush();
//     });
//   });
//
// });
