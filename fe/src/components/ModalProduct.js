import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Modal, Form, Input } from 'antd'
import { values } from "mobx";

class ModalProduct extends Component {
  state = {
    form: {
      sku: 'Sample',
      name: 'Nama Product',
      price: 0,
      description: '',
      prdimage01: '',
      prdimage02: '',
      prdimage03: '',
      prdimage04: '',
    }
  }

  render() {
    const { productStore } = this.props;
    const { visibleModal, updateForm, form } = productStore;
    console.log(form.name);
    // var { form } = this.state
    // form = productStore.form;
    // this.state.form = form;
    
    // const handleChange  = (e, field) => {
    //   const updateForm = Object.assign(form, {
    //     [field] : e.target.value
    //   })
    //   this.setState({ form: updateForm});
    //   console.log(field)
    // }

    // const inputRef = React.useRef(null);
    // const [input, setInput] = React.useState(true);

    return (
      <>
        <Modal
            title="Form"
            visible={visibleModal}
            onOk={() => {
              productStore.updateProduct()
            }}
            confirmLoading={this.state.confirmLoading}
            onCancel={() => {
              productStore.closeModal()
            }}
          >
            <Form
              name='form-product'
              labelCol={{ span:8 }}
              wrapperCol={{ span:16 }}
              initialValues={{
                name: form.name
              }}
              >
              <Form.Item
                label='Sku'
                name='sku'
                rules={[{ required: true, message: 'Please input sku!' }]}
                >
                <Input initialValue={form.sku} onChange={(e) => updateForm('sku', e.target.value)}/>
              </Form.Item>
              <Form.Item
                label='Name'
                name='name'
                >
                <Input v={form.name} onChange={(e) => updateForm('name', e.target.value)}/>
              </Form.Item>
              <Form.Item
                label='Price'
                name='price'
                >
                <Input v={form.price} onChange={(e) => updateForm('price', e.target.value)}/>
              </Form.Item>
              <Form.Item
                label='Description'
                name='description'
                >
                <Input.TextArea onChange={(e) => updateForm('description', e.target.value)} />
              </Form.Item>
            </Form>
          </Modal>
      </>
    )
  }
}
export default inject('productStore')(observer(ModalProduct))

// function ModalForm({
//   store
// }) {
//   const { visibleModal } = store;
//   console.log(visibleModal);

//   const form = {}
//   const handleChange = () => {}
  
//   return (
//     <>
//       <Modal
//           title="Title"
//           visible={visibleModal}
//           onOk={() => {
//             store.updateProduct()
//           }}
//           onCancel={() => {
//             store.closeModal()
//           }}
//         >
//           <Form
//             name='form-product'
//             labelCol={{ span:8 }}
//             wrapperCol={{ span:16 }}
//             initialValues={{ form }}
//             autoComplete='off'>
//             <Form.Item
//               label='Sku'
//               name='sku'
//               rules={[{ required: true, message: 'Please input sku!' }]}
//               >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               label='Name'
//               name='name'
//               >
//               <Input value={form.name} onChange={(e) => handleChange(e, 'name')}/>
//             </Form.Item>
//             <Form.Item
//               label='Price'
//               name='price'
//               >
//               <Input value={form.price} onChange={(e) => handleChange(e, 'price')}/>
//             </Form.Item>
//             <Form.Item
//               label='Description'
//               name='description'
//               >
//               <Input.TextArea label="Description" name="description" value={form.description} />
//             </Form.Item>
//           </Form>
//         </Modal>
//     </>
//   )
// }
// export default ModalForm