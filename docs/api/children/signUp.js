module.exports = {
  '/children/signup': {
    post: {
      tags: ['Children'],
      summary: '아이 회원가입',
      description: 'required value : userId, password, name',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              properties: {
                userId: {
                  type: 'string',
                  description: '사용자 아이디',
                  example: 'eastsea1004',
                },
                password: {
                  type: 'string',
                  description: '사용자 패스워드',
                  example: 'test1234!@#',
                },
                name: {
                  type: 'string',
                  description: '사용자 이름',
                  example: '최동해',
                },
                kakaoId: {
                  type: 'integer',
                  description: '사용자 카카오 아이디(카카오 인증 아이디)',
                  example: '2479035654',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: '아이 회원가입 성공',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: '성공',
                    example: 'SUCCESS_SIGN_UP',
                  },
                },
              },
            },
          },
        },
        400: {
          description: '에러: 필수값(userId, password, name)을 넣지 않았거나 키 값이 맞지 않을 때',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: '에러 메시지',
                    example: 'KEY_ERROR',
                  },
                },
              },
            },
          },
        },
        403: {
          description: '에러 : 이미 사용중인 아이디 / 이미 사용중인 카카오아이디',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: '에러 메시지',
                    example: 'ERROR_ACCOUNT_ALREADY_EXIST / ERROR_KAKAOID_ALREADY_EXIST',
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