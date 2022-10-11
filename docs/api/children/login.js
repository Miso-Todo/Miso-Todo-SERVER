module.exports = {
  '/children/login': {
    post: {
      tags: ['Children'],
      summary: '아이 로그인',
      description: 'required value : userId, password',
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
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: '아이 로그인 성공',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: '성공',
                    example: 'SUCCESS_LOGIN',
                  },
                  token: {
                    type: 'string',
                    description: 'jwt 토큰값',
                    example: '토큰',
                  },
                },
              },
            },
          },
        },
        400: {
          description: '에러: 키에러 / 아이디 오류(DB에 존재하지 않음) / 비밀번호 오류',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: '에러 메시지',
                    example: 'KEY_ERROR / INVALID_ACCOUNT / INVALID_PASSWORD',
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