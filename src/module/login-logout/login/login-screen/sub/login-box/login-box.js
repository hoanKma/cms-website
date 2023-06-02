import { memo } from 'react';

import { Center, Flex, Heading, Text } from '@chakra-ui/react';

import LoginForm from '../../../login-form';

const LoginBox = memo(() => (
  <Center flex={1}>
    <Flex direction="column" maxW={{ xs: '425px', md: '520px', xl: '425px' }}>
      <Flex
        align="center"
        wrap="wrap"
        gap={4}
        mb={{ xs: 7, xl: 4, '2xl': 7 }}
        mt={{ xs: 10, md: 20, xl: 10, '2xl': 20 }}
      >
        <Flex w={{ '2xl': '100%' }} /* Push <Heading> to the next line in 2xl */>
          {/* <Image src={logo} boxSize={{ xs: '48px', '2xl': '64px' }} /> */}
          <Text>Logo</Text>
        </Flex>
        <Heading as="h1" fontSize="3xl" fontWeight={600}>
          Đăng nhập Hệ thống quản trị Examination
        </Heading>
        <Flex flex={1}>
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<p>Cho hàm số&nbsp;<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>y</mi><mo>=</mo><mfrac><mrow class="MJX-TeXAtom-ORD"><mi>a</mi><mi>x</mi><mo>+</mo><mi>b</mi></mrow><mrow class="MJX-TeXAtom-ORD"><mi>c</mi><mi>x</mi><mo>+</mo><mi>d</mi></mrow></mfrac></math>&nbsp;có đồ thị là đường cong trong hình vẽ bên. Tọa độ giao điểm của đồ thị hàm số đã cho và trục hoành là</p><figure class="image"><img src="https://video.vietjack.com/upload2/quiz_source1/2023/03/blobid0-1678429809.png" alt="Cho hàm số  y= ax+b/ cx+d có đồ thị là đường cong trong hình vẽ bên. Tọa độ giao điểm của đồ thị hàm số đã cho và trục hoành là   (ảnh 1)"></figure>'
            }}
          />
        </Flex>
      </Flex>

      <LoginForm />
    </Flex>
  </Center>
));

export default LoginBox;
