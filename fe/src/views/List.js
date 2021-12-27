
import { inject, observer } from "mobx-react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Row, Col, Button } from 'antd';
import Product from '../components/Product';
import React from "react";

class List extends React.Component {

  componentDidMount() {
    this.fetchMoreData();
  }

  fetchMoreData(page) {
    const { productStore } = this.props;
    // if (page) {
    //   productStore.nextPage();
    // }

    if (productStore.hasMore) {
      setTimeout(() => {
        productStore.loadProducts();
      }, 2000);
    }
  }

  render() {
    const { productStore } = this.props;
    return (
      <>
        {/* <InfiniteScroll 
          next={fetchMoreData()}
          dataLength={productStore.products.length}
          hasMore={productStore.hasMore}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          >
        </InfiniteScroll> */}
  
        <Row gutter={[16, 16]}>
            {
              productStore.products.map((item, key) => {
                  return (
                    <Col key={key} span={6}>
                      <Product product={item[1]} />
                    </Col>
                  )
                })
            }
            { 
              productStore.hasMore ? (
                <p style={{ textAlign: 'center' }}>
                      <Button onClick={() => this.fetchMoreData()}>Load More</Button>
                    </p>
              ) : ''
            }
            
        </Row>
      </>
    )
  }
}

export default inject('productStore')(observer(List));