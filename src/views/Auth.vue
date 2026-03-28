<template>
  <div class="auth">
    <h2>{{ isLogin ? '登录' : '注册' }}</h2>
    
    <div v-if="authStore.loading" class="loading">
      <div class="loading-spinner"></div>
      <p>处理中...</p>
    </div>
    
    <div v-else class="auth-form">
      <div v-if="authStore.error" class="error-message">
        {{ authStore.error }}
      </div>
      
      <div class="form-group">
        <label>邮箱</label>
        <input 
          v-model="form.email" 
          type="email" 
          placeholder="请输入邮箱" 
          class="form-input"
          required
        />
      </div>
      
      <div class="form-group">
        <label>密码</label>
        <input 
          v-model="form.password" 
          type="password" 
          placeholder="请输入密码" 
          class="form-input"
          required
        />
      </div>
      
      <div v-if="!isLogin" class="form-group">
        <label>昵称</label>
        <input 
          v-model="form.nickname" 
          type="text" 
          placeholder="请输入昵称" 
          class="form-input"
          required
        />
      </div>
      
      <button @click="handleSubmit" class="btn btn-primary">
        {{ isLogin ? '登录' : '注册' }}
      </button>
      
      <div class="toggle">
        {{ isLogin ? '还没有账号？' : '已有账号？' }}
        <a href="#" @click.prevent="isLogin = !isLogin">
          {{ isLogin ? '立即注册' : '立即登录' }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const isLogin = ref(true)

const form = reactive({
  email: '',
  password: '',
  nickname: ''
})

async function handleSubmit() {
  try {
    if (isLogin.value) {
      await authStore.login({
        email: form.email,
        password: form.password
      })
      alert('登录成功！')
    } else {
      await authStore.register({
        nickname: form.nickname,
        email: form.email,
        password: form.password
      })
      alert('注册成功！')
      isLogin.value = true
    }
  } catch (error) {
    console.error('认证失败:', error)
  }
}
</script>

<style scoped>
.auth {
  background: linear-gradient(145deg, #FAF8F3 0%, #F0EBE0 100%);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(139, 115, 85, 0.15);
  max-width: 400px;
  margin: 0 auto;
  border: 2px solid #D4C5A9;
}

.auth h2 {
  color: #4A4035;
  margin-bottom: 30px;
  font-weight: 600;
  text-align: center;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: #4A4035;
  font-weight: 500;
}

.form-input {
  padding: 12px 16px;
  border: 2px solid #C3B091;
  border-radius: 8px;
  background: #FAF8F3;
  color: #4A4035;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #B8860B;
}

.btn {
  padding: 14px 20px;
  border: 2px solid;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.btn-primary {
  background: #6B7B4C;
  color: #FAF8F3;
  border-color: #6B7B4C;
}

.btn-primary:hover {
  background: #5A6A3D;
  border-color: #5A6A3D;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(107, 123, 76, 0.3);
}

.toggle {
  text-align: center;
  color: #6B5B4F;
  margin-top: 10px;
}

.toggle a {
  color: #6B7B4C;
  font-weight: 600;
  text-decoration: none;
  margin-left: 5px;
}

.toggle a:hover {
  text-decoration: underline;
  color: #5A6A3D;
}

.error-message {
  background: rgba(139, 69, 19, 0.1);
  border: 1px solid #8B4513;
  color: #8B4513;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #8B7355;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #E8DFD0;
  border-top: 4px solid #8B7355;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
