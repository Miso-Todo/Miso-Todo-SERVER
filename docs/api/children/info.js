module.exports = {
  '/children/info': {
    get: {
      tags: ['Children'],
      summary: '아이 정보 가져오기',
      description: 'required value : ',
      security: [{
        jwtAuth: []
      }],
      requestBody: {},
      responses: {
        200: {
          description: '아이 정보 가져오기 성공',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  results: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'integer',
                        description: '사용자 고유아이디',
                        example: 'eastsea1004',
                      },
                      userId: {
                        type: 'string',
                        description: '사용자 아이디',
                        example: 'eastsea1004',
                      },
                      uniqueNumber: {
                        type: 'integer',
                        description: '사용자 고유번호',
                        example: '123456',
                      },
                      Modifier: {
                        properties: {
                          content: {
                            type: 'string',
                            description: '사용자 수식어',
                            example: '잘생긴',
                          },
                        },
                      },
                      Profile: {
                        properties: {
                          photoUrl: {
                            type: 'string',
                            description: '사용자 프로필 사진',
                            example: 'url',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        401: {
          description: '에러: 잘못된 토큰 혹은 헤더에 토큰 없음',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: '에러 메시지',
                    example: 'INVALID_TOKEN',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};