const chai = require('chai');
const should = chai.should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const shortid = require('shortid');
const Class = require('../models/Class');

describe("Class has many students", function () {
  it("Give an class, it returns list of enroll students", function () {

    return Class.findByName("nglis", "LIKE")  //Try to change to nglishkkk
      .then(data => {
        if (data instanceof Class) { //Kiểm tra kiểu đối tượng trả về nếu đúng là Class hãy tìm kiếm student tham gia lớp
          return data.getStudents()
          .then(data => {
            return data.length;
          });
        } else { //Nếu gặp lỗi chứng tỏ không tìm được lớp hãy ném tiếp lỗi
          throw new Error('Cannot find class');
        }

      })  // Có phần catch error, lỗi luôn sáng sủa rõ nghĩa
      .catch(error => {
        return error
      })
      .should.eventually.equal(2);
  });
});