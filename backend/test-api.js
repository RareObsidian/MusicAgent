/**
 * 钢琴助手后端 API 测试脚本
 * 使用 Node.js 内置 fetch (v18+)
 */

const BASE_URL = 'http://localhost:3000/api/v1';

// 颜色输出
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(type, message) {
  const color = colors[type] || colors.reset;
  console.log(`${color}${message}${colors.reset}`);
}

// 测试数据
let authToken = null;
let userId = null;
let practiceId = null;

// 延迟函数
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 测试 1: 健康检查
async function testHealth() {
  log('blue', '\n📡 测试 1: 服务健康检查');
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `test${Date.now()}@example.com`,
        password: '123456',
        nickname: '测试用户'
      })
    });
    
    if (response.status === 201 || response.status === 200) {
      log('green', '✅ 服务运行正常');
      return true;
    } else {
      const error = await response.text();
      log('red', `❌ 服务异常: ${error}`);
      return false;
    }
  } catch (error) {
    log('red', `❌ 连接失败: ${error.message}`);
    return false;
  }
}

// 测试 2: 用户注册
async function testRegister() {
  log('blue', '\n👤 测试 2: 用户注册');
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `piano${Date.now()}@test.com`,
        password: '123456',
        nickname: '钢琴爱好者'
      })
    });

    const data = await response.json();
    
    if (response.ok && data.access_token) {
      authToken = data.access_token;
      userId = data.user.id;
      log('green', `✅ 注册成功`);
      log('yellow', `   Token: ${authToken.substring(0, 30)}...`);
      log('yellow', `   用户ID: ${userId}`);
      return true;
    } else {
      log('red', `❌ 注册失败: ${JSON.stringify(data)}`);
      return false;
    }
  } catch (error) {
    log('red', `❌ 注册异常: ${error.message}`);
    return false;
  }
}

// 测试 3: 用户登录
async function testLogin() {
  log('blue', '\n🔐 测试 3: 用户登录');
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'piano@test.com',
        password: '123456'
      })
    });

    const data = await response.json();
    
    if (response.ok && data.access_token) {
      log('green', `✅ 登录成功`);
      return true;
    } else {
      log('yellow', `⚠️ 登录失败(可能用户不存在): ${JSON.stringify(data)}`);
      return false;
    }
  } catch (error) {
    log('red', `❌ 登录异常: ${error.message}`);
    return false;
  }
}

// 测试 4: 获取用户信息
async function testGetProfile() {
  log('blue', '\n👤 测试 4: 获取用户信息');
  if (!authToken) {
    log('yellow', '⚠️ 跳过测试: 未获取到 Token');
    return false;
  }

  try {
    const response = await fetch(`${BASE_URL}/users/profile`, {
      headers: { 
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (response.ok) {
      log('green', `✅ 获取用户信息成功`);
      log('yellow', `   昵称: ${data.nickname}`);
      log('yellow', `   邮箱: ${data.email}`);
      return true;
    } else {
      log('red', `❌ 获取失败: ${JSON.stringify(data)}`);
      return false;
    }
  } catch (error) {
    log('red', `❌ 获取异常: ${error.message}`);
    return false;
  }
}

// 测试 5: 开始练习
async function testStartPractice() {
  log('blue', '\n🎹 测试 5: 开始练习');
  if (!authToken) {
    log('yellow', '⚠️ 跳过测试: 未获取到 Token');
    return false;
  }

  try {
    const response = await fetch(`${BASE_URL}/practice/start`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: '音阶练习',
        startTime: new Date().toISOString(),
        notes: '测试练习记录'
      })
    });

    const data = await response.json();
    
    if (response.ok && data.id) {
      practiceId = data.id;
      log('green', `✅ 开始练习成功`);
      log('yellow', `   练习ID: ${practiceId}`);
      log('yellow', `   状态: ${data.status}`);
      return true;
    } else {
      log('red', `❌ 开始练习失败: ${JSON.stringify(data)}`);
      return false;
    }
  } catch (error) {
    log('red', `❌ 开始练习异常: ${error.message}`);
    return false;
  }
}

// 测试 6: 结束练习
async function testEndPractice() {
  log('blue', '\n✋ 测试 6: 结束练习');
  if (!authToken || !practiceId) {
    log('yellow', '⚠️ 跳过测试: 未获取到 Token 或练习ID');
    return false;
  }

  // 等待 2 秒模拟练习时间
  await delay(2000);

  try {
    const response = await fetch(`${BASE_URL}/practice/${practiceId}/end`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        focusRating: 4,
        notes: '练习完成'
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      log('green', `✅ 结束练习成功`);
      log('yellow', `   时长: ${data.durationSeconds} 秒`);
      log('yellow', `   状态: ${data.status}`);
      return true;
    } else {
      log('red', `❌ 结束练习失败: ${JSON.stringify(data)}`);
      return false;
    }
  } catch (error) {
    log('red', `❌ 结束练习异常: ${error.message}`);
    return false;
  }
}

// 测试 7: 获取练习记录
async function testGetPracticeRecords() {
  log('blue', '\n📋 测试 7: 获取练习记录');
  if (!authToken) {
    log('yellow', '⚠️ 跳过测试: 未获取到 Token');
    return false;
  }

  try {
    const response = await fetch(`${BASE_URL}/practice`, {
      headers: { 
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (response.ok && Array.isArray(data)) {
      log('green', `✅ 获取练习记录成功`);
      log('yellow', `   记录数: ${data.length}`);
      return true;
    } else {
      log('red', `❌ 获取记录失败: ${JSON.stringify(data)}`);
      return false;
    }
  } catch (error) {
    log('red', `❌ 获取记录异常: ${error.message}`);
    return false;
  }
}

// 测试 8: 获取统计数据
async function testGetStats() {
  log('blue', '\n📊 测试 8: 获取练习统计');
  if (!authToken) {
    log('yellow', '⚠️ 跳过测试: 未获取到 Token');
    return false;
  }

  try {
    const response = await fetch(`${BASE_URL}/practice/stats`, {
      headers: { 
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (response.ok) {
      log('green', `✅ 获取统计成功`);
      log('yellow', `   今日: ${data.todayMinutes} 分钟`);
      log('yellow', `   本周: ${data.weekMinutes} 分钟`);
      log('yellow', `   连续: ${data.streakDays} 天`);
      return true;
    } else {
      log('red', `❌ 获取统计失败: ${JSON.stringify(data)}`);
      return false;
    }
  } catch (error) {
    log('red', `❌ 获取统计异常: ${error.message}`);
    return false;
  }
}

// 测试 9: 初始化音阶数据
async function testSeedMusicData() {
  log('blue', '\n🎵 测试 9: 初始化音阶数据');
  
  try {
    const response = await fetch(`${BASE_URL}/music/seed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    
    if (response.ok) {
      log('green', `✅ 音阶数据初始化成功`);
      return true;
    } else {
      log('red', `❌ 初始化失败: ${JSON.stringify(data)}`);
      return false;
    }
  } catch (error) {
    log('red', `❌ 初始化异常: ${error.message}`);
    return false;
  }
}

// 测试 10: 获取音阶
async function testGetScales() {
  log('blue', '\n🎼 测试 10: 获取音阶数据');
  if (!authToken) {
    log('yellow', '⚠️ 跳过测试: 未获取到 Token');
    return false;
  }

  try {
    const response = await fetch(`${BASE_URL}/music/scales`, {
      headers: { 
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (response.ok && Array.isArray(data)) {
      log('green', `✅ 获取音阶成功`);
      log('yellow', `   音阶数: ${data.length}`);
      if (data.length > 0) {
        log('yellow', `   示例: ${data[0].key} ${data[0].mode}`);
      }
      return true;
    } else {
      log('red', `❌ 获取音阶失败: ${JSON.stringify(data)}`);
      return false;
    }
  } catch (error) {
    log('red', `❌ 获取音阶异常: ${error.message}`);
    return false;
  }
}

// 主测试函数
async function runTests() {
  log('blue', '\n' + '='.repeat(50));
  log('blue', '🎹 钢琴助手后端 API 测试');
  log('blue', '='.repeat(50));
  log('yellow', `测试地址: ${BASE_URL}`);
  log('yellow', `开始时间: ${new Date().toLocaleString()}`);
  log('blue', '='.repeat(50));

  const results = [];

  // 等待服务启动
  await delay(2000);

  // 运行所有测试
  results.push(await testHealth());
  results.push(await testRegister());
  results.push(await testLogin());
  results.push(await testGetProfile());
  results.push(await testStartPractice());
  results.push(await testEndPractice());
  results.push(await testGetPracticeRecords());
  results.push(await testGetStats());
  results.push(await testSeedMusicData());
  results.push(await testGetScales());

  // 汇总结果
  const passed = results.filter(r => r).length;
  const total = results.length;

  log('blue', '\n' + '='.repeat(50));
  log('blue', '📊 测试结果汇总');
  log('blue', '='.repeat(50));
  log('green', `✅ 通过: ${passed}/${total}`);
  log('red', `❌ 失败: ${total - passed}/${total}`);
  log('blue', '='.repeat(50));

  if (passed === total) {
    log('green', '\n🎉 所有测试通过！后端服务运行正常！');
  } else {
    log('yellow', '\n⚠️ 部分测试未通过，请检查日志');
  }

  process.exit(0);
}

// 运行测试
runTests().catch(error => {
  log('red', `\n💥 测试运行异常: ${error.message}`);
  process.exit(1);
});
