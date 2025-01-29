<template>
  <div>
    <a-card :title="`${isLogin ? 'Login':'Register'}`" class="max-w-40 m-auto mt-10">
      <a-form
          :model="form"
          @finish="handleSubmit"
          layout="vertical"
          class="w-full mt-12"
      >
        <span class="custom-label">Username</span>
        <a-form-item
            class="mb-7 custom-label"
            name="username"
            :rules="[
               {
                      required: true,
                      message: 'Username is required',
               },
              ]"
        >
          <a-input
              type="text"
              v-model:value="form.username"
              size="large"
              placeholder="username"
              class="rounded-none px-4 py-2 border border-gray-300 focus:border-blue-500"
          >
          </a-input>
        </a-form-item>

        <span class="custom-label">Password</span>
        <a-form-item
            class="mb-12 custom-label"
            name="password"
            :rules="[
                {
                  required: true,
                  message: ('Password is required'),
                },
              ]"
        >
          <a-input-password
              size="large"
              v-model:value="form.password"
              placeholder="password"
              class="rounded-none px-4 py-2 border border-gray-300 focus:border-blue-500"
          />
        </a-form-item>

        <a-form-item>
          <a-button
              size="large"
              html-type="submit"
              block
              class="bg-blue-500 hover:bg-blue-600 !text-white font-semibold !rounded-none"
          >
            {{ isLogin ? 'Login' : 'Register' }}
          </a-button>
        </a-form-item>
      </a-form>
      <div class="w-full flex-center">
        <a-button @click="reverseLogin" type="link" class="link-button">
          {{ isLogin ? 'Do not have and account? Register' : 'Have an account? Login' }}
        </a-button>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, shallowRef} from "vue";
import Cookies from "js-cookie";
import {useRouter} from "vue-router";

import {useFetch} from "../../composable/useFetch.ts";
import type {UserInterface} from "../../services/types/users.ts";
import useNotification from "../../composable/useNotification.ts";
import useMutate from "../../composable/useMutate.ts";

const notification = useNotification()
const router = useRouter();
const isAuthenticated = Cookies.get("isAuthenticated");
const usersFetch = useFetch({url: "users"});
const mutateApi = useMutate();

const isLogin = shallowRef(true)
const reverseLogin = () => isLogin.value = !isLogin.value
const form = reactive({username: "", password: "",});

const onRegisterAction = (actionType: string) => {
  if (actionType === "success") {
    Cookies.set("isAuthenticated", 'true');
    router.push("/");
    notification.success({message: 'Registered successfully.'});
  } else {
    notification.error({message: 'Register failed.'});
  }
}

const handleSubmit = async () => {
  const users = usersFetch.data.value as UserInterface[]
  const filterUsers = users.filter(item => item.username === form.username)

  if (isLogin.value) {
    if (filterUsers.length) {
      const user = filterUsers?.[0] as UserInterface
      if (user.password === form.password) {
        Cookies.set('isAuthenticated', 'true', {expires: 7}); // Expires in 7 days
        await router.push('/');
      } else {
        notification.error({message: `Password is incorrect`})
      }
    } else {
      notification.error({message: `User '${form.username}' not found`})
    }
  } else {
    if (filterUsers.length) {
      notification.error({message: `Username '${form.username}' is in use`})
    } else {
      await mutateApi.mutate({
        url: 'users',
        method: "POST",
        onSuccess: () => onRegisterAction('success'),
        onError: () => onRegisterAction('fail'),
        data: {username: form.username, password: form.password}
      });
    }
  }
};

onMounted(() => {
  if (isAuthenticated) {
    router.push('/');
    notification.info({message: `You are logged in`})
  }
})
</script>

<style>
.w-full {
  width: 100%;
}

.max-w-40 {
  max-width: 400px;
}

.m-auto {
  margin: auto;
}

.mt-10 {
  margin-top: 80px;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>