<template>
    <div class="tools-div">
        <el-button type="success" size="small" @click="addShow">添 加</el-button>
    </div>

    <el-dialog v-model="dialogVisible" title="添加或修改" width="40%">
        <el-form label-width="120px">
            <el-form-item label="名称">
                <el-input v-model="unit.name"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <!---数据表格-->
    <el-table :data="list" style="width: 100%">
        <el-table-column prop="name" label="单位名称" />
        <el-table-column prop="createTime" label="创建时间"  />
        <el-table-column label="操作" align="center" width="150" #default="scope">
            <el-button type="primary" size="small" @click="editUnit(scope.row)">
                修改
            </el-button>
            <el-button type="danger" size="small" @click="removeUnit(scope.row)">
                删除
            </el-button>
        </el-table-column>
    </el-table>

    <el-pagination
                v-model:current-page="pageParams.page"
                v-model:page-size="pageParams.limit"
                :page-sizes="[10, 20, 50, 100]"
                @size-change="fetchData"
                @current-change="fetchData"
                layout="total, sizes, prev, pager, next"
                :total="total"
                />
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { getPageList, addUnit, updateUnit, deleteUnit } from '@/api/productUnit.js'
import { ElMessage, ElMessageBox } from 'element-plus'
/////////////////商品单位
const dialogVisible = ref(false)

const unit = ref({
    id: '',
    name: ''
})

const addShow = ()=>{
    unit.value = {}
    dialogVisible.value = true
}

const editUnit = (row)=>{
    unit.value = {...row}
    dialogVisible.value = true
}

const submit = async()=>{
    if(!unit.value.id) {//没有id进行添加操作
        const {code} = await addUnit(unit.value)
        if(code === 200) {
            dialogVisible.value = false
            ElMessage.success("操作成功")
            fetchData()
        }
    } else { //修改
        const {code} = await updateUnit(unit.value)
        if(code === 200) {
            dialogVisible.value = false
            ElMessage.success("操作成功")
            fetchData()
        }
    }
}

//删除
const removeUnit = (row)=>{
    ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
       const {code} = await deleteUnit(row.id)
       if(code === 200) {
            ElMessage.success("操作成功")
            fetchData()
       }
    })
}

// 表格数据模型
const list = ref([]);

// 分页条数据模型
const total = ref(0)

//分页
const pageParamsForm = {
    page:1, //当前页
    limit:10 //每页记录数
}
const pageParams = ref(pageParamsForm)

//钩子函数
onMounted(()=>{
    fetchData()
})

//条件查询方法 axios调用
const fetchData = async ()=>{
    const {data} = await getPageList(pageParams.value.page,
                                pageParams.value.limit)
    list.value = data.list
    total.value = data.total
}

</script>

<style scoped>
.search-div {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}
.tools-div {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>