
1. 读取json 并添加到数据库
```
  fs.readFile('rs.json', 'utf8', (err, data) => {
    const jsonDataArray = JSON.parse(data)
    try {
        for (const item of jsonDataArray) {
            school.create({
                id: uuid.v1(),
                school_id: item.school_id,
                name: item.hightitle
            })
            console.log('Added item to the database:', item)
        }
    } catch (err) {
        console.error('Error adding items to the database:', err)
    }
})
```
