'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { urlencoded } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages'
    return queryInterface.bulkInsert(options, [
      {
        "spotId": 1,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-48241498/original/b8bcdd9a-888c-435e-b3a6-f4d31dde47e2.jpeg?im_w=1200",
        "preview": true
      },
      {
        "spotId": 1,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-48241498/original/80cc51ef-dc3f-4105-ae0c-2481eb1f4ed8.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 1,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-48241498/original/536df69c-2e62-4286-8ed4-d39ce60c8eb6.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 1,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-48241498/original/5fe6c1e6-a581-431b-87b2-df105f661d65.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 1,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-48241498/original/4f76910f-d2a4-441d-906c-ced650495a9e.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 2,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-735503846456259923/original/9724806d-f059-4bdf-81d2-60920e11941d.jpeg?im_w=1200",
        "preview": true
      },
      {
        "spotId": 2,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-735503846456259923/original/8accf867-1b16-40a3-9f19-11ac6f3e8ef2.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 2,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-735503846456259923/original/c9436df5-3021-4ec7-b694-2ef89cd7d0d3.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 2,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-735503846456259923/original/657e0353-1bf2-433c-b190-f651b5eeb2a3.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 2,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-735503846456259923/original/3e55482b-d557-4b25-8c22-3d0e13b0812a.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 3,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-15058446/original/56fe9e3f-48c1-4777-a2b0-5b7745eb9874.jpeg?im_w=1200",
        "preview": true
      },
      {
        "spotId": 3,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-15058446/original/56ff5e60-671b-4736-9d50-e3b59dc9d185.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 3,
        "url": "https://a0.muscache.com/im/pictures/90f625f1-67e9-4a62-8e10-554ae12c8763.jpg?im_w=720",
        "preview": true
      },
      {
        "spotId": 3,
        "url": "https://a0.muscache.com/im/pictures/ad0164c8-acb5-477d-b1d0-19fabd9931cc.jpg?im_w=720",
        "preview": true
      },
      {
        "spotId": 3,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-15058446/original/5e5f55e7-b4a9-4fd6-ad0c-b5cbedf94f15.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 4,
        "url": "https://a0.muscache.com/im/pictures/b669d7d8-7480-4318-af90-90af6826b286.jpg?im_w=720",
        "preview": true
      },
      {
        "spotId": 4,
        "url": "https://a0.muscache.com/im/pictures/67a07e9f-539c-45ad-ba9c-6127913eb834.jpg?im_w=1200",
        "preview": true
      },
      {
        "spotId": 4,
        "url": "https://a0.muscache.com/im/pictures/1abce696-e1c4-4971-82d1-e8e4744920ef.jpg?im_w=720",
        "preview": true
      },
      {
        "spotId": 4,
        "url": "https://a0.muscache.com/im/pictures/21e226aa-2969-44dc-8f3d-150720ff0ee7.jpg?im_w=720",
        "preview": true
      },
      {
        "spotId": 4,
        "url": "https://a0.muscache.com/im/pictures/5d7cbf15-d394-428e-a38e-f4dc7c6a5e2b.jpg?im_w=720",
        "preview": true
      },
      {
        "spotId": 5,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-658062825246095048/original/99ba22cb-8fa3-4af0-a04e-e7fb96f65dae.jpeg?im_w=1200",
        "preview": true
      },
      {
        "spotId": 5,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-658062825246095048/original/df0fb23c-6580-44fc-bb19-e31995f03a45.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 5,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-658062825246095048/original/0b470739-2eac-4c16-b155-f96d2dc6cc01.jpeg?im_w=1200",
        "preview": true
      },
      {
        "spotId": 5,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-658062825246095048/original/05f71b47-a650-40ad-8aa6-d4fd99b93651.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 5,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-658062825246095048/original/4c511c6c-b23a-4a64-8f5d-c8885ef1b7d6.jpeg?im_w=1200",
        "preview": true
      },
      {
        "spotId": 6,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-563831580953529422/original/c723d5d5-69ac-4ecf-b2d5-fa708359d93f.jpeg?im_w=1200",
        "preview": true
      },
      {
        "spotId": 6,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-563831580953529422/original/2a16e595-c722-4757-b9fd-8907e9e5cac8.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 6,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-563831580953529422/original/a9400906-2ecc-4e64-99b1-2a3bb8408e87.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 6,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-563831580953529422/original/f59ef114-0c92-4c4f-8898-7e0d53dab2aa.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 6,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-563831580953529422/original/bd78e905-c726-45b2-81ef-4c2637668aa6.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 7,
        "url": "https://a0.muscache.com/im/pictures/bb5cc812-6915-49f0-ba27-e765524427d1.jpg?im_w=1200",
        "preview": true
      },
      {
        "spotId": 7,
        "url": "https://a0.muscache.com/im/pictures/37761608/7ebe8a16_original.jpg?im_w=720",
        "preview": true
      },
      {
        "spotId": 7,
        "url": "https://a0.muscache.com/im/pictures/c6eb3529-125c-4b39-8f17-a1a1c4e34c89.jpg?im_w=720",
        "preview": true
      },
      {
        "spotId": 7,
        "url": "https://a0.muscache.com/im/pictures/bf92cbdc-a658-4639-8ae1-0be7267b33d7.jpg?im_w=720",
        "preview": true
      },
      {
        "spotId": 7,
        "url": "https://a0.muscache.com/im/pictures/90170098-2777-451f-9822-af49e5c60070.jpg?im_w=1200",
        "preview": true
      },
      {
        "spotId": 8,
        "url": "https://a0.muscache.com/im/pictures/20bc9152-5ca5-4e97-9f85-274bc070af3d.jpg?im_w=1200",
        "preview": true
      },
      {
        "spotId": 8,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-48868211/original/3809d710-edb8-4ffb-91b9-8796a20c9937.jpeg?im_w=1200",
        "preview": true
      },
      {
        "spotId": 8,
        "url": "https://a0.muscache.com/im/pictures/eb0efd09-8995-4748-bd64-516252263d45.jpg?im_w=720",
        "preview": true
      },
      {
        "spotId": 8,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-48868211/original/fd927b38-d0fd-41c1-957b-259d928e135b.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 8,
        "url": "https://a0.muscache.com/im/pictures/f0882680-574c-44e2-9f4c-3e1af57c4412.jpg?im_w=720",
        "preview": true
      },
      {
        "spotId": 9,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-622558257164331150/original/e853dacb-d742-40cc-a192-0eb973facfe4.jpeg?im_w=1200",
        "preview": true
      },
      {
        "spotId": 9,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-622558257164331150/original/c375f6b2-02f9-43fe-a07d-ba5b9ff30b6a.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 9,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-622558257164331150/original/60cddae6-ec40-46c7-9121-4c6eb1e0d462.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 9,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-622558257164331150/original/c7361d8d-3f87-4bf4-ab68-ca87d707b83f.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 9,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-622558257164331150/original/7abd885e-7123-4b15-bc7a-f1db2f4c08bc.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 10,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-39299442/original/8ce5eb32-69d5-4b5b-804c-60d0c1ace65b.jpeg?im_w=1200 ",
        "preview": true
      },
      {
        "spotId": 10,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-39299442/original/5bbfe7fc-6ee5-4777-9f5b-14b0d4e2548b.jpeg?im_w=720 ",
        "preview": true
      },
      {
        "spotId": 10,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-39299442/original/ecdc2417-3f8d-476e-a2eb-08aac1a93ff0.jpeg?im_w=720 ",
        "preview": true
      },
      {
        "spotId": 10,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-39299442/original/f67bac48-c23d-4d13-9df6-b507890d98ca.jpeg?im_w=720 ",
        "preview": true
      },
      {
        "spotId": 10,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-39299442/original/2204eb2a-ca08-44e2-b9e8-6476ceda001b.jpeg?im_w=720 ",
        "preview": true
      },
      {
        "spotId": 11,
        "url": "https://a0.muscache.com/im/pictures/f3a51d95-7b93-436e-9708-75a3b85394e9.jpg?im_w=1200",
        "preview": true
      },
      {
        "spotId": 11,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-649552169664996673/original/20b494c4-68b6-48d5-945a-acca67649049.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 11,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-649552169664996673/original/6802eaa6-4617-4403-b3d1-72a9cb5bcc79.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 11,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-649552169664996673/original/56c23469-1670-4a74-9a0d-b4384a0f408a.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 11,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-649552169664996673/original/8b3c9ff0-19c4-4834-9804-454f64464f7f.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 12,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-710998671982205615/original/d7febbec-9cab-43ae-801f-ac502b913ee2.jpeg?im_w=1200",
        "preview": true
      },
      {
        "spotId": 12,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-710998671982205615/original/fbb601a1-aef2-4db9-9b83-7d37279ee385.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 12,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-710998671982205615/original/5febad64-a5dd-4423-b5a4-2e0bcfa8db4e.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 12,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-710998671982205615/original/226f9100-b14b-42bb-a4f1-3a73dacd7601.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 12,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-710998671982205615/original/0e394a6e-a613-4722-9260-d58f3c6515b4.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 13,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-619888838021208388/original/107e0400-a598-4330-9f9b-ffef27a33dac.jpeg?im_w=1200",
        "preview": true
      },
      {
        "spotId": 13,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-619888838021208388/original/0315ee3d-f28e-41c7-8fd9-5639da809368.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 13,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-619888838021208388/original/dcf310d8-e3fe-41cf-857b-017b605d4ff5.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 13,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-619888838021208388/original/c100c0d0-bf72-409c-a4bb-004c4fb56e09.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 13,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-619888838021208388/original/2e82f435-0537-485b-8119-7a6f910bf351.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 14,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-628757683083715788/original/34a32e82-740c-44f9-b154-5052177ebe47.jpeg?im_w=1200",
        "preview": true
      },
      {
        "spotId": 14,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-628757683083715788/original/03e39107-1751-4842-870a-8681042d1af6.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 14,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-628757683083715788/original/8b7f46c7-8e3d-4fed-a9e5-ac27a5bcf6b1.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 14,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-628757683083715788/original/f8524c1d-a37d-4e07-b223-ef65a034efc2.jpeg?im_w=1200",
        "preview": true
      },
      {
        "spotId": 14,
        "url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-628757683083715788/original/50973c0a-5542-4713-a550-16eb5dc1313e.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 15,
        "url": "https://a0.muscache.com/im/pictures/86ff917b-8ad1-4df2-9bbc-a2c303410891.jpg?im_w=1200",
        "preview": true
      },
      {
        "spotId": 15,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-32846931/original/1eb40e54-c4dd-43c7-a595-b8707be99329.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 15,
        "url": "https://a0.muscache.com/im/pictures/miso/Hosting-32846931/original/3679279e-4e0a-47c7-82dd-ae951e423818.jpeg?im_w=720",
        "preview": true
      },
      {
        "spotId": 15,
        "url": "https://a0.muscache.com/im/pictures/9244e738-c967-4d60-a956-8ea4ed25946d.jpg?im_w=720",
        "preview": true
      },
      {
        "spotId": 15,
        "url": "https://a0.muscache.com/im/pictures/0ae9f2cb-abd3-4571-982e-862f742db363.jpg?im_w=720",
        "preview": true
      },
      {
        "spotId": 16,
        "url": "https://a0.muscache.com/im/pictures/43f6a8d7-231d-42fd-a203-b3928691ac54.jpg?im_w=1200",
        "preview": true
      },
      {
        "spotId": 16,
        "url": "https://a0.muscache.com/im/pictures/3ca666c3-1546-45b2-a04a-ecb1d1381869.jpg?im_w=720",
        "preview": true
      },
      {
        "spotId": 16,
        "url": "https://a0.muscache.com/im/pictures/23c04a60-c4d4-42be-b9eb-706280fb9f30.jpg?im_w=720",
        "preview": true
      },
      {
        "spotId": 16,
        "url": "https://a0.muscache.com/im/pictures/878d292d-09c6-4ef2-b2ce-1e57b23bfa60.jpg?im_w=720",
        "preview": true
      },
      {
        "spotId": 16,
        "url": "https://a0.muscache.com/im/pictures/38dfe115-79dd-4c8e-92ed-7681551d4d95.jpg?im_w=720",
        "preview": true
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages'
    return queryInterface.bulkDelete(options)
  }
};
