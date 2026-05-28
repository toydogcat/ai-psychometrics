# Answer key mappings for courses 2, 3, 4, and 5
# Each week has:
# - SC: String of 10 characters (A-D) representing the 10 Single Choice answers.
# - MC: List of 10 lists of strings (e.g. [['A', 'C'], ['B']]) representing the 10 Multiple Choice answers.
# - Fill: List of 10 strings representing the 10 Fill-in-the-blank answers.

ANSWERS_COURSE2 = {
    1: {
        "SC": "BBCBDDBCBD",
        "MC": [["A", "C", "D"], ["A", "B"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "B", "C"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "C", "D"]],
        "Fill": ["dropna", "inplace", "columns", "read_excel", "iloc", "fillna", "to_excel", "concat", "merge", "values"]
    },
    2: {
        "SC": "BBDABABBAA",
        "MC": [["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "C", "D"], ["A", "B", "C"], ["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "B", "C"], ["A", "B"], ["A", "B", "C", "D"]],
        "Fill": ["1", "rows", "italic", "shared", "text", "2", "末尾", "CENTER", "docx", "text"]
    },
    3: {
        "SC": "BCBACBDCAD",
        "MC": [["A", "B", "C"], ["A", "C"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["add_slide", "prs.save", "left", "add_picture", "width", "placeholder", "text", "add_paragraph", "styles", "font"]
    },
    4: {
        "SC": "ACBDCBDCAB",
        "MC": [["A", "B"], ["A", "B", "C"], ["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["smtplib", "SMTP_SSL", "login", "sendmail", "MIMEMultipart", "attachment", "imaplib", "SELECT", "fetch", "quit"]
    },
    5: {
        "SC": "BCADABCDBC",
        "MC": [["A", "B", "C"], ["A", "B", "D"], ["A", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["requests", "status_code", "text", "BeautifulSoup", "find_all", "select", "headers", "params", "json", "encoding"]
    },
    6: {
        "SC": "CBDACBCDAC",
        "MC": [["A", "B"], ["A", "B", "C"], ["A", "C", "D"], ["A", "B", "C", "D"], ["A", "C"], ["A", "B", "D"], ["A", "B", "C"], ["B", "C", "D"], ["A", "B", "C", "D"], ["A", "B", "C"]],
        "Fill": ["selenium", "webdriver", "get", "find_element", "send_keys", "click", "implicitly_wait", "WebDriverWait", "page_source", "quit"]
    },
    7: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C"]],
        "Fill": ["scrapy", "start_urls", "parse", "yield", "Item", "Pipeline", "settings", "USER_AGENT", "response.xpath", "css"]
    },
    8: {
        "SC": "CADBCBDADC",
        "MC": [["A", "B", "C", "D"], ["A", "C"], ["A", "B", "D"], ["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "C"], ["A", "B"]],
        "Fill": ["USER_AGENT", "robots.txt", "download_delay", "referer", "cookie", "Proxy", "captcha", "Session", "Selenium", "API"]
    },
    9: {
        "SC": "BCDACBDCAB",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"]],
        "Fill": ["pandas", "python-docx", "requests", "BeautifulSoup", "selenium", "scrapy", "Proxy", "robots.txt", "DataFrame", "json"]
    },
    10: {
        "SC": "BCADCDBCAB",
        "MC": [["A", "B", "C"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C", "D"], ["A", "B", "C"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B"], ["A", "B", "C"]],
        "Fill": ["numpy", "array", "ndim", "shape", "dtype", "arange", "reshape", "dot", "mean", "std"]
    },
    11: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["groupby", "merge", "concat", "apply", "pivot_table", "shift", "pct_change", "rolling", "datetime", "set_index"]
    },
    12: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["matplotlib", "pyplot", "plot", "scatter", "bar", "hist", "xlabel", "ylabel", "title", "legend"]
    },
    13: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["sqlite3", "connect", "cursor", "execute", "fetchall", "commit", "close", "SQLAlchemy", "create_engine", "session"]
    },
    14: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["yfinance", "Ticker", "history", "download", "pandas_datareader", "API", "json", "CSV", "resample", "dropna"]
    },
    15: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["rolling", "mean", "std", "RSI", "MACD", "EMA", "signal", "Bollinger", "upper", "lower"]
    },
    16: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["backtest", "signal", "position", "returns", "cumprod", "drawdown", "Sharpe", "alpha", "beta", "slippage"]
    },
    17: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["backtrader", "Cerebro", "Strategy", "Signal", "Broker", "DataFeed", "addstrategy", "adddata", "run", "plot"]
    },
    18: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["Pandas", "python-docx", "requests", "Selenium", "yfinance", "rolling", "Sharpe", "drawdown", "Cerebro", "Strategy"]
    }
}

ANSWERS_COURSE3 = {
    1: {
        "SC": "CBBCBBDCCC",
        "MC": [["A", "B", "D"], ["A", "B", "D"], ["A", "B", "D"], ["A", "B", "C"], ["A", "B", "C"], ["A", "B", "C"], ["A", "B", "C"], ["A", "B", "D"], ["A", "C"], ["A", "B", "C"]],
        "Fill": ["Performance", "圖靈", "監督式", "split", "predict", "回規", "降維", "測試", "經典", "Experience"]
    },
    2: {
        "SC": "BBDACBDADC",
        "MC": [["A", "B", "C"], ["A", "B"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C"], ["A", "C", "D"], ["A", "B", "D"], ["A", "C"], ["A", "B", "C", "D"], ["A", "B"]],
        "Fill": ["coef_", "intercept_", "MSE", "OLS", "決定係數", "共線性", "殘差", "LinearRegression", "fit", "predict"]
    },
    3: {
        "SC": "BCADCDBCAB",
        "MC": [["A", "B", "D"], ["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "C"], ["A", "B", "D"], ["A", "C"], ["A", "B", "C"], ["A", "C", "D"], ["A", "B"], ["A", "B", "C", "D"]],
        "Fill": ["反", "學習率", "隨機", "小批量", "凸", "縮放", "SGDRegressor", "fit", "梯度", "局部"]
    },
    4: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["Sigmoid", "對數損失", "最大似然", "LogisticRegression", "OvR", "Softmax", "機率", "邊界", "L2", "predict_proba"]
    },
    5: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["決策樹", "熵", "資訊增益", "Gini", "剪枝", "DecisionTreeClassifier", "max_depth", "特徵重要性", "根節點", "葉節點"]
    },
    6: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["隨機森林", "Bagging", "自助採樣", "袋外誤差", "RandomForestClassifier", "n_estimators", "基學習器", "投票", "隨機性", "泛化誤差"]
    },
    7: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["支持向量機", "超平面", "間隔", "支持向量", "核函數", "RBF", "SVC", "C", "對偶", "鬆弛變數"]
    },
    8: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["KNN", "K", "距離", "歐氏距離", "懶惰學習", "KNeighborsClassifier", "多數決", "特徵縮放", "交叉驗證", "維度災難"]
    },
    9: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["邏輯回歸", "決策樹", "隨機森林", "支持向量機", "正規化", "超參數", "混淆矩陣", "F1", "ROC", "AUC"]
    },
    10: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["非監督學習", "K-Means", "質心", "SSE", "Elbow", "輪廓係數", "KMeans", "n_clusters", "局部最優", "距離"]
    },
    11: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["PCA", "方差", "特徵值", "降維", "主成分", "explained_variance_", "正交", "標準化", "奇異值分解", "重建誤差"]
    },
    12: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["DBSCAN", "核心點", "邊界點", "噪聲點", "Eps", "MinPts", "密度", "DBSCAN", "距離", "聚類"]
    },
    13: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["關聯規則", "支持度", "置信度", "提升度", "Apriori", "頻繁項集", "剪枝", "關聯分析", "transaction", "association_rules"]
    },
    14: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["特徵工程", "標準化", "歸一化", "獨熱編碼", "標籤編碼", "StandardScaler", "MinMaxScaler", "OneHotEncoder", "擬合", "轉換"]
    },
    15: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["特徵選擇", "過濾法", "包裝法", "嵌入法", "方差過濾", "SelectKBest", "RFE", "L1", "特徵重要性", "降維"]
    },
    16: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["交叉驗證", "K折", "留一法", "分層", "cross_val_score", "GridSearchCV", "超參數", "驗證集", "KFold", "時間序列"]
    },
    17: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["混淆矩陣", "準確率", "精確率", "召回率", "F1", "ROC", "AUC", "PR", "真實類別", "預測類別"]
    },
    18: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["線性回歸", "邏輯回歸", "決策樹", "隨機森林", "K-Means", "PCA", "特徵工程", "交叉驗證", "混淆矩陣", "Scikit-Learn"]
    }
}

ANSWERS_COURSE4 = {
    1: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["感知器", "多層感知器", "BP", "激活函數", "Sigmoid", "ReLU", "PyTorch", "Tensor", "gradient", "backward"]
    },
    2: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["優化器", "梯度下降", "學習率", "動量", "Adam", "損失函數", "交叉熵", "MSE", "Optimizer", "zero_grad"]
    },
    3: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["過擬合", "正則化", "L1", "L2", "Dropout", "EarlyStopping", "訓練集", "驗證集", "權重衰減", "泛化"]
    },
    4: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["Dataset", "DataLoader", "batch_size", "shuffle", "Epoch", "Iteration", "transforms", "Normalize", "device", "cuda"]
    },
    5: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["卷積", "卷積核", "步長", "填充", "特徵圖", "池化", "最大池化", "通道", "nn.Conv2d", "nn.MaxPool2d"]
    },
    6: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["LeNet", "AlexNet", "VGG", "感受野", "池化", "卷積", "激活函數", "全連接", "ReLU", "Dropout"]
    },
    7: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["ResNet", "殘差連接", "梯度消失", "退化問題", "恆等映射", "DenseNet", "特徵複用", "nn.Module", "forward", "shortcut"]
    },
    8: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["遷移學習", "微調", "預訓練模型", "特徵提取", "凍結", "ImageNet", "models", "pretrained", "權重", "分類頭"]
    },
    9: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["感知器", "卷積", "池化", "ResNet", "遷移學習", "過擬合", "Optimizer", "backward", "Dataset", "CUDA"]
    },
    10: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["RNN", "隱狀態", "序列數據", "時間步", "共享權重", "梯度消失", "梯度爆炸", "nn.RNN", "輸入", "輸出"]
    },
    11: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["LSTM", "遺忘門", "輸入門", "輸出門", "細胞狀態", "GRU", "更新門", "重置門", "nn.LSTM", "nn.GRU"]
    },
    12: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["Seq2Seq", "編碼器", "解碼器", "注意力機制", "上下文向量", "對齊", "權重", "Attention", "機器翻譯", "動態"]
    },
    13: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["Transformer", "自注意力", "多頭注意力", "位置編碼", "前饋神經網絡", "層歸一化", "殘差連接", "並行計算", "QKV", "Scaled"]
    },
    14: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["BERT", "GPT", "預訓練", "微調", "遮罩語言模型", "自回歸", "自編碼", "Transformer", "下游任務", "生成"]
    },
    15: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["大語言模型", "湧現能力", "Scaling", "參數量", "Transformer", "提示工程", "少樣本學習", "零樣本學習", "幻覺", "微調"]
    },
    16: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["提示工程", "角色扮演", "思維鏈", "少樣本提示", "系統提示詞", "負面提示詞", "零樣本", "溫度", "Token", "上下文"]
    },
    17: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["RAG", "向量數據庫", "嵌入", "檢索", "生成", "相似度", "知識庫", "分塊", "重排", "LLM"]
    },
    18: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["感知器", "卷積", "池化", "ResNet", "RNN", "LSTM", "Transformer", "BERT", "GPT", "RAG"]
    }
}

ANSWERS_COURSE5 = {
    1: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["人工智慧", "歷史脈絡", "達特茅斯", "圖靈測試", "機器學習", "深度學習", "寒冬", "專家系統", "神經網絡", "算力"]
    },
    2: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["機器學習", "監督學習", "非監督學習", "強化學習", "標籤", "分類", "回歸", "聚類", "過擬合", "特徵"]
    },
    3: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["深度學習", "神經網絡", "感知器", "激活函數", "權重", "偏差", "反向傳播", "梯度下降", "CNN", "RNN"]
    },
    4: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["自然語言處理", "電腦視覺", "語音識別", "圖像分類", "物體檢測", "分詞", "詞性標註", "詞嵌入", "CNN", "Transformer"]
    },
    5: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["生成式AI", "大語言模型", "Transformer", "自注意力", "參數量", "湧現", "自回歸", "GPT", "BERT", "提示詞"]
    },
    6: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["圖像生成", "擴散模型", "GAN", "生成器", "判別器", "潛在空間", "噪聲", "去噪", "VAE", "CLIP"]
    },
    7: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["多模態", "文字生成圖像", "語音生成文字", "多模態對齊", "CLIP", "對比學習", "共享空間", "圖像描述", "視覺問答", "交叉注意力"]
    },
    8: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["生成式工具", "ChatGPT", "Midjourney", "Copilot", "API", "擴展插件", "語音助理", "自動寫作", "代碼生成", "設計工具"]
    },
    9: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["人工智慧", "機器學習", "深度學習", "生成式AI", "大語言模型", "CNN", "RNN", "Transformer", "GAN", "擴散模型"]
    },
    10: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["提示工程", "提示詞", "明確性", "上下文", "角色扮演", "約束條件", "輸出格式", "零樣本", "少樣本", "思維鏈"]
    },
    11: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["CoT", "思維鏈", "推理", "逐步思考", "Few-Shot", "提示技巧", "幻覺", "邏輯", "自我修正", "複雜任務"]
    },
    12: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["文案寫作", "程式設計", "客服自動化", "翻譯", "摘要", "內容生成", "效率提升", "自動化", "輔助工具", "人工審查"]
    },
    13: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["工作流", "AI代理", "自定義工具", "整合", "自動化", "RAG", "知識庫", "檢索", "向量化", "微調"]
    },
    14: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["AI倫理", "偏見", "公平性", "透明度", "可解釋性", "隱私保護", "數據安全", "版權問題", "虛假訊息", "惡意使用"]
    },
    15: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["法律法規", "歐盟AI法案", "智商產權", "責任歸屬", "安全合規", "著作權", "隱私法", "數據庫", "審計", "合規性"]
    },
    16: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["專案規劃", "需求分析", "技術選型", "ROI", "PoC", "生命週期", "數據準備", "模型評估", "部署", "持續監控"]
    },
    17: {
        "SC": "BCADCDBCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "C", "D"], ["A", "B", "D"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["導入策略", "變革管理", "人才培訓", "跨部門協作", "敏捷開發", "安全邊界", "隱私牆", "業務對齊", "漸進式", "反饋機制"]
    },
    18: {
        "SC": "CADBCBDCAD",
        "MC": [["A", "B", "C"], ["A", "B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"], ["A", "B", "C"], ["A", "C"], ["A", "B", "C", "D"], ["B", "C", "D"], ["A", "C"], ["A", "B", "C", "D"]],
        "Fill": ["人工智慧", "機器學習", "深度學習", "生成式AI", "提示工程", "思維鏈", "AI倫理", "法律法規", "專案規劃", "導入策略"]
    }
}
